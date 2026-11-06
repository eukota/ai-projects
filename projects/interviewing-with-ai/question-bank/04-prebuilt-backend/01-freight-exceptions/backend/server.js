import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const spec = YAML.parse(fs.readFileSync(path.join(here, "openapi.yaml"), "utf8"));
const PORT = process.env.PORT || 4000;

// ---------- seed data (deterministic, relative to "now" at reset) ----------

const CUSTOMERS = [
  { id: "c-1", name: "Quark's Discount Replicators", tier: "standard" },
  { id: "c-2", name: "Zek's Latinum Wholesale", tier: "priority" },
  { id: "c-3", name: "Nog's Surplus Starship Parts", tier: "standard" },
  { id: "c-4", name: "Moogie's Fine Textiles", tier: "priority" },
  { id: "c-5", name: "Pel's Pre-Owned Holosuites", tier: "standard" },
];
const DISPATCHERS = ["Rom", "Brunt", "Gaila", "Krax"];
const LANES = [
  ["Rotterdam, NL", "Chicago, US"],
  ["Shenzhen, CN", "Los Angeles, US"],
  ["Hamburg, DE", "Newark, US"],
  ["Santos, BR", "Miami, US"],
  ["Mumbai, IN", "Felixstowe, UK"],
];
const STATUSES = ["booked", "in_transit", "at_customs", "out_for_delivery", "delivered"];
const EXCEPTION_KINDS = ["customs_hold", "damaged", "delayed", "address_issue"];
// Allowed forward moves for PATCH status (anything else is a 409)
const NEXT = {
  booked: ["in_transit"],
  in_transit: ["at_customs", "out_for_delivery"],
  at_customs: ["in_transit", "out_for_delivery"],
  out_for_delivery: ["delivered"],
  delivered: [],
};

let shipments, exceptions, nextExceptionId, nextEventId;

function seed() {
  const now = Date.now();
  const day = 86400000;
  shipments = new Map();
  exceptions = new Map();
  nextExceptionId = 1;
  nextEventId = 1;

  for (let i = 1; i <= 28; i++) {
    const status = STATUSES[(i * 7) % STATUSES.length];
    const [origin, destination] = LANES[i % LANES.length];
    const customer = CUSTOMERS[i % CUSTOMERS.length];
    const created = new Date(now - (i % 12 + 2) * day).toISOString();
    const s = {
      id: `S-${1000 + i}`,
      customerId: customer.id,
      origin,
      destination,
      status,
      weightKg: 40 + ((i * 53) % 900),
      // QUIRK: eta is null while a shipment is at customs; clients must handle it
      eta: status === "at_customs" ? null : new Date(now + ((i % 9) - 3) * day).toISOString(),
      assignedTo: i % 5 === 0 ? null : DISPATCHERS[i % DISPATCHERS.length],
      createdAt: created,
      events: [{ id: `e-${nextEventId++}`, type: "created", note: "Shipment booked", at: created }],
    };
    shipments.set(s.id, s);

    // Roughly a third of shipments carry an exception
    if (i % 3 === 0 && status !== "delivered") {
      const kind = EXCEPTION_KINDS[i % EXCEPTION_KINDS.length];
      const id = `x-${nextExceptionId++}`;
      exceptions.set(id, {
        id,
        shipmentId: s.id,
        kind,
        severity: kind === "damaged" || kind === "customs_hold" ? "high" : "medium",
        note: `${kind.replace("_", " ")} reported`,
        openedAt: new Date(now - (i % 4) * day).toISOString(),
        resolvedAt: null,
        resolution: null,
      });
    }
  }
}
seed();

// ---------- helpers ----------

const fail = (res, status, code, message) =>
  res.status(status).json({ error: { code, message } });

function shipmentView(s, { withEvents = false } = {}) {
  const open = [...exceptions.values()].filter((x) => x.shipmentId === s.id && !x.resolvedAt);
  const { events, ...rest } = s;
  return { ...rest, openExceptionCount: open.length, ...(withEvents ? { events } : {}) };
}

// ---------- app ----------

const app = express();
app.use(express.json());

// Structured request log: one JSON line per request
app.use((req, res, next) => {
  const t = Date.now();
  res.on("finish", () =>
    console.log(JSON.stringify({ at: new Date().toISOString(), method: req.method, path: req.originalUrl, status: res.statusCode, ms: Date.now() - t }))
  );
  next();
});

// Permissive CORS so a separate dev server can call the API
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "GET,POST,PATCH,OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
app.get("/openapi.yaml", (_req, res) => res.type("text/yaml").send(fs.readFileSync(path.join(here, "openapi.yaml"), "utf8")));
app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.get("/api/customers", (_req, res) => res.json({ data: CUSTOMERS }));

app.get("/api/shipments", (req, res) => {
  const { status, customerId, assignedTo, q } = req.query;
  const page = Math.max(1, parseInt(req.query.page ?? "1", 10) || 1);
  const pageSize = Math.min(50, Math.max(1, parseInt(req.query.pageSize ?? "10", 10) || 10));
  let list = [...shipments.values()];
  if (status) list = list.filter((s) => s.status === status);
  if (customerId) list = list.filter((s) => s.customerId === customerId);
  // assignedTo=none returns unassigned shipments
  if (assignedTo) list = list.filter((s) => (assignedTo === "none" ? s.assignedTo === null : s.assignedTo === assignedTo));
  if (q) {
    const needle = String(q).toLowerCase();
    list = list.filter((s) => `${s.id} ${s.origin} ${s.destination}`.toLowerCase().includes(needle));
  }
  list.sort((a, b) => a.id.localeCompare(b.id));
  const total = list.length;
  const data = list.slice((page - 1) * pageSize, page * pageSize).map((s) => shipmentView(s));
  res.json({ data, page, pageSize, total });
});

app.get("/api/shipments/:id", (req, res) => {
  const s = shipments.get(req.params.id);
  if (!s) return fail(res, 404, "not_found", `No shipment ${req.params.id}`);
  res.json(shipmentView(s, { withEvents: true }));
});

app.patch("/api/shipments/:id", (req, res) => {
  const s = shipments.get(req.params.id);
  if (!s) return fail(res, 404, "not_found", `No shipment ${req.params.id}`);
  const { status, assignedTo } = req.body ?? {};
  if (status === undefined && assignedTo === undefined)
    return fail(res, 400, "invalid_input", "Provide status and/or assignedTo");
  if (assignedTo !== undefined && assignedTo !== null && !DISPATCHERS.includes(assignedTo))
    return fail(res, 400, "invalid_input", `assignedTo must be one of ${DISPATCHERS.join(", ")} or null`);
  if (status !== undefined) {
    if (!STATUSES.includes(status)) return fail(res, 400, "invalid_input", `Unknown status ${status}`);
    if (!NEXT[s.status].includes(status))
      return fail(res, 409, "invalid_transition", `Cannot move from ${s.status} to ${status}`);
    // Cannot deliver while an exception is open
    const blocking = [...exceptions.values()].some((x) => x.shipmentId === s.id && !x.resolvedAt);
    if (status === "delivered" && blocking)
      return fail(res, 409, "open_exception", "Resolve open exceptions before marking delivered");
    s.events.push({ id: `e-${nextEventId++}`, type: "status_changed", note: `${s.status} -> ${status}`, at: new Date().toISOString() });
    s.status = status;
  }
  if (assignedTo !== undefined) {
    s.events.push({ id: `e-${nextEventId++}`, type: "assigned", note: `Assigned to ${assignedTo ?? "nobody"}`, at: new Date().toISOString() });
    s.assignedTo = assignedTo;
  }
  res.json(shipmentView(s, { withEvents: true }));
});

app.get("/api/exceptions", (req, res) => {
  const { state = "open", severity } = req.query;
  let list = [...exceptions.values()];
  if (state === "open") list = list.filter((x) => !x.resolvedAt);
  else if (state === "resolved") list = list.filter((x) => x.resolvedAt);
  if (severity) list = list.filter((x) => x.severity === severity);
  list.sort((a, b) => a.openedAt.localeCompare(b.openedAt));
  res.json({ data: list });
});

app.post("/api/shipments/:id/exceptions", (req, res) => {
  const s = shipments.get(req.params.id);
  if (!s) return fail(res, 404, "not_found", `No shipment ${req.params.id}`);
  const { kind, note } = req.body ?? {};
  if (!EXCEPTION_KINDS.includes(kind)) return fail(res, 400, "invalid_input", `kind must be one of ${EXCEPTION_KINDS.join(", ")}`);
  const id = `x-${nextExceptionId++}`;
  const x = {
    id, shipmentId: s.id, kind,
    severity: kind === "damaged" || kind === "customs_hold" ? "high" : "medium",
    note: note ?? "", openedAt: new Date().toISOString(), resolvedAt: null, resolution: null,
  };
  exceptions.set(id, x);
  s.events.push({ id: `e-${nextEventId++}`, type: "exception_opened", note: `${kind}`, at: x.openedAt });
  res.status(201).json(x);
});

app.post("/api/exceptions/:id/resolve", (req, res) => {
  const x = exceptions.get(req.params.id);
  if (!x) return fail(res, 404, "not_found", `No exception ${req.params.id}`);
  if (x.resolvedAt) return fail(res, 409, "already_resolved", "Exception is already resolved");
  const { resolution } = req.body ?? {};
  if (!resolution || !String(resolution).trim()) return fail(res, 400, "invalid_input", "resolution is required");
  x.resolvedAt = new Date().toISOString();
  x.resolution = String(resolution).trim();
  shipments.get(x.shipmentId).events.push({ id: `e-${nextEventId++}`, type: "exception_resolved", note: x.resolution, at: x.resolvedAt });
  res.json(x);
});

app.post("/api/admin/reset", (_req, res) => {
  seed();
  res.json({ ok: true, shipments: shipments.size, exceptions: exceptions.size });
});

app.use((_req, res) => fail(res, 404, "not_found", "No such route"));

app.listen(PORT, () => console.log(JSON.stringify({ at: new Date().toISOString(), msg: `listening on http://localhost:${PORT}`, docs: `http://localhost:${PORT}/docs` })));
