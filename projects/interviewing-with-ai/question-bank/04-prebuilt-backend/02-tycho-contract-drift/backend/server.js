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

// Two datasets share the same API shape. "default" is the original freight data.
// "minerals" adds a `cargo` field (Earth minerals only) and Starfleet-flavoured names.
// Minerals is the default here. `SEED=default npm start` or `POST /api/admin/reset?dataset=default` gives the original freight data.
const DATASETS = {
  default: {
    customers: [
      { id: "c-1", name: "Quark's Discount Replicators", tier: "standard" },
      { id: "c-2", name: "Zek's Latinum Wholesale", tier: "priority" },
      { id: "c-3", name: "Nog's Surplus Starship Parts", tier: "standard" },
      { id: "c-4", name: "Moogie's Fine Textiles", tier: "priority" },
      { id: "c-5", name: "Pel's Pre-Owned Holosuites", tier: "standard" },
    ],
    dispatchers: ["Rom", "Brunt", "Gaila", "Krax"],
    lanes: [
      ["Rotterdam, NL", "Chicago, US"],
      ["Shenzhen, CN", "Los Angeles, US"],
      ["Hamburg, DE", "Newark, US"],
      ["Santos, BR", "Miami, US"],
      ["Mumbai, IN", "Felixstowe, UK"],
    ],
    cargo: null,
  },
  minerals: {
    customers: [
      { id: "c-1", name: "Starfleet Corps of Engineers", tier: "priority" },
      { id: "c-2", name: "San Francisco Fleet Yards", tier: "standard" },
      { id: "c-3", name: "Starfleet Academy Geology Dept", tier: "standard" },
      { id: "c-4", name: "Daystrom Institute", tier: "priority" },
      { id: "c-5", name: "Starfleet Quartermaster Corps", tier: "standard" },
    ],
    dispatchers: ["Scott", "Sulu", "Uhura", "Chekov"],
    lanes: [
      ["Port Hedland, AU", "San Francisco, US"],
      ["Santos, BR", "Rotterdam, NL"],
      ["Richards Bay, ZA", "Yokohama, JP"],
      ["Antofagasta, CL", "Los Angeles, US"],
      ["Narvik, NO", "Felixstowe, UK"],
    ],
    cargo: [
      "Hematite (iron ore)",
      "Bauxite (aluminium ore)",
      "Chalcopyrite (copper ore)",
      "Quartz sand",
      "Halite (rock salt)",
      "Gypsum",
      "Limestone (calcite)",
      "Kaolin clay",
      "Graphite",
      "Magnetite (iron ore)",
    ],
  },
};
let datasetName = process.env.SEED ?? "minerals";
if (!DATASETS[datasetName]) {
  console.error(`Unknown SEED "${datasetName}". Choose: ${Object.keys(DATASETS).join(", ")}`);
  process.exit(1);
}
let CUSTOMERS, DISPATCHERS, LANES, CARGO;
function useDataset(name) {
  datasetName = name;
  ({ customers: CUSTOMERS, dispatchers: DISPATCHERS, lanes: LANES, cargo: CARGO } = DATASETS[name]);
}
useDataset(datasetName);
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
      ...(CARGO ? { cargo: CARGO[i % CARGO.length] } : {}),
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
  return { ...rest, ...(addons.roles ? { shipperId: shipperOf(s) } : {}), openExceptionCount: open.length, ...(withEvents ? { events } : {}) };
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

// ---------- interviewer-only "bad deploy" switch (deliberately not in openapi.yaml) ----------
// POST /api/admin/break?mode=rename|envelope|nullstring|flaky|off   GET /api/admin/break shows state.
// Simulates a backend release that changes the contract after the candidate has a working UI.
// In-memory only: restarting the server clears it; /api/admin/reset does NOT.
const BREAK_MODES = {
  rename: "responses: shipment.assignedTo is now shipment.owner (requests still send assignedTo)",
  envelope: "responses: list envelope { data, total } is now { items, count }",
  nullstring: "responses: every null is now the string \"null\" (assignedTo, eta, resolvedAt, resolution), which is truthy",
  flaky: "every 3rd /api request (except admin and health) returns 503 upstream_unavailable",
};
let breakMode = "off";
let flakyCount = 0;

const mapKeys = (v, fn) =>
  Array.isArray(v) ? v.map((x) => mapKeys(x, fn))
  : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, val]) => fn(k, mapKeys(val, fn))))
  : v;

function breakBody(body) {
  if (breakMode === "rename") return mapKeys(body, (k, v) => [k === "assignedTo" ? "owner" : k, v]);
  if (breakMode === "nullstring") return mapKeys(body, (k, v) => [k, v === null ? "null" : v]);
  if (breakMode === "envelope" && body && Array.isArray(body.data))
    return mapKeys(body, (k, v) => [k === "data" ? "items" : k === "total" ? "count" : k, v]);
  return body;
}

app.use((req, res, next) => {
  res.set("X-Api-Version", breakMode === "off" ? "1" : "2");
  const isApi = req.path.startsWith("/api/") && !req.path.startsWith("/api/admin") && req.path !== "/api/health";
  if (breakMode === "off" || !isApi) return next();
  if (breakMode === "flaky" && ++flakyCount % 3 === 0) {
    res.set("Retry-After", "1");
    return fail(res, 503, "upstream_unavailable", "Service temporarily unavailable");
  }
  const json = res.json.bind(res);
  res.json = (body) => json(res.statusCode < 400 ? breakBody(body) : body);
  next();
});

app.all("/api/admin/break", (req, res) => {
  if (req.method === "POST") {
    const mode = req.query.mode;
    if (mode !== "off" && !BREAK_MODES[mode])
      return fail(res, 400, "invalid_input", `mode must be one of off, ${Object.keys(BREAK_MODES).join(", ")}`);
    breakMode = mode;
    flakyCount = 0;
    console.log(JSON.stringify({ at: new Date().toISOString(), msg: "break_mode_changed", mode: breakMode }));
  }
  res.json({ mode: breakMode, description: BREAK_MODES[breakMode] ?? "contract matches the docs", modes: BREAK_MODES });
});

// ---------- interviewer-only "security release" add-on (deliberately not in openapi.yaml) ----------
// POST /api/admin/addon?name=roles&state=on|off   GET /api/admin/addon shows state.
// While on: every /api call except health, admin and login needs a bearer token, data is filtered by role,
// and login + notes endpoints exist. While off they do not exist. In-memory; restart clears it.
// Planted gap: the spec says a shipment that is not yours returns 403; the server returns 404.
const ORGS = {
  shippers: [
    { id: "sh-1", name: "Pilbara Ridge Mining" },
    { id: "sh-2", name: "Richards Bay Minerals Co-op" },
    { id: "sh-3", name: "Antofagasta Ore Partners" },
  ],
};
const USERS = [
  { id: "u-1", name: "Scott", email: "scott@tycho.example", role: "admin", orgId: null },
  { id: "u-2", name: "Uhura", email: "uhura@tycho.example", role: "admin", orgId: null },
  { id: "u-3", name: "Pilbara Ridge Ops", email: "ops@pilbara-ridge.example", role: "shipper", orgId: "sh-1" },
  { id: "u-4", name: "RBM Dispatch", email: "dispatch@rbm-coop.example", role: "shipper", orgId: "sh-2" },
  { id: "u-5", name: "Corps of Engineers Receiving", email: "engineering@starfleet-engineers.example", role: "receiver", orgId: "c-1" },
  { id: "u-6", name: "Daystrom Labs", email: "labs@daystrom.example", role: "receiver", orgId: "c-4" },
  { id: "u-7", name: "Academy Geology", email: "geology@academy.example", role: "receiver", orgId: "c-3" },
];
const addons = { roles: false };
const tokens = new Map();
let notes = [];
let nextNoteId = 1;
let notesSeeded = false;
const shipperOf = (s) => ORGS.shippers[Math.floor((parseInt(s.id.slice(2), 10) - 1000) / 3) % ORGS.shippers.length].id;

function ensureNotes() {
  if (notesSeeded) return;
  notesSeeded = true;
  notes = [];
  const at = (s, h) => new Date(Date.parse(s.createdAt) + h * 3600000).toISOString();
  const add = (s, user, body, visibility, h) =>
    notes.push({ id: `n-${nextNoteId++}`, shipmentId: s.id, body, visibility, createdAt: at(s, h), author: { id: user.id, name: user.name, role: user.role } });
  for (const s of shipments.values()) {
    const n = parseInt(s.id.slice(2), 10) - 1000;
    const shipperUser = USERS.find((u) => u.orgId === shipperOf(s));
    const recvUser = USERS.find((u) => u.orgId === s.customerId);
    if (n % 4 === 0 && shipperUser) add(s, shipperUser, "Loaded and sealed. Bill of lading attached to the booking.", "shared", 2);
    if (n % 5 === 0 && recvUser) add(s, recvUser, "Dock is closed Fridays. Please deliver before 14:00.", "shared", 5);
    if (n % 6 === 0) add(s, USERS[0], "Broker chasing paperwork. Do not promise a date yet.", "internal", 8);
  }
}

const canSee = (req, s) => {
  const u = req.user;
  if (!u || u.role === "admin") return true;
  return u.role === "shipper" ? shipperOf(s) === u.orgId : s.customerId === u.orgId;
};
const adminOnly = (req, res) => {
  if (req.user && req.user.role !== "admin") { fail(res, 403, "forbidden", "Admins only"); return false; }
  return true;
};
const liveSpec = () => {
  const base = YAML.parse(fs.readFileSync(path.join(here, "openapi.yaml"), "utf8"));
  if (!addons.roles) return base;
  const add = YAML.parse(fs.readFileSync(path.join(here, "roles-addon.yaml"), "utf8"));
  base.info.description = `${base.info.description}\n${add.description}`;
  Object.assign(base.paths, add.paths);
  Object.assign(base.components.schemas, add.components.schemas);
  base.components.securitySchemes = { bearer: { type: "http", scheme: "bearer" } };
  base.security = [{ bearer: [] }];
  return base;
};

app.all("/api/admin/addon", (req, res) => {
  if (req.method === "POST") {
    const { name, state } = req.query;
    if (!(name in addons) || !["on", "off"].includes(state)) return fail(res, 400, "invalid_input", "name=roles&state=on|off");
    addons[name] = state === "on";
    if (addons.roles) ensureNotes();
    tokens.clear();
    console.log(JSON.stringify({ at: new Date().toISOString(), msg: "addon_changed", name, state }));
  }
  res.json({ addons, sampleLogins: USERS.map((u) => `${u.role}: ${u.email}`) });
});

// Auth gate + login + notes (all inert while the add-on is off)
app.use((req, res, next) => {
  if (!addons.roles) return next();
  const open = !req.path.startsWith("/api/") || req.path === "/api/health" || req.path.startsWith("/api/admin") || req.path === "/api/auth/login";
  if (open) return next();
  const token = (req.get("Authorization") ?? "").replace(/^Bearer /i, "");
  const user = tokens.get(token);
  if (!user) return fail(res, 401, "unauthenticated", "Sign in: missing or invalid bearer token");
  req.user = user;
  next();
});

app.post("/api/auth/login", (req, res, next) => {
  if (!addons.roles) return next();
  const u = USERS.find((x) => x.email === String(req.body?.email ?? "").trim().toLowerCase());
  if (!u) return fail(res, 401, "invalid_credentials", "Unknown email");
  const token = `tok_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
  tokens.set(token, u);
  console.log(JSON.stringify({ at: new Date().toISOString(), msg: "login", user: u.id, role: u.role }));
  res.json({ token, user: u });
});

app.get("/api/shipments/:id/notes", (req, res, next) => {
  if (!addons.roles) return next();
  const s = shipments.get(req.params.id);
  if (!s || !canSee(req, s)) return fail(res, 404, "not_found", `No shipment ${req.params.id}`);
  res.json({ data: notes.filter((n) => n.shipmentId === s.id && (n.visibility === "shared" || req.user.role === "admin")) });
});

app.post("/api/shipments/:id/notes", (req, res, next) => {
  if (!addons.roles) return next();
  const s = shipments.get(req.params.id);
  if (!s || !canSee(req, s)) return fail(res, 404, "not_found", `No shipment ${req.params.id}`);
  const { body, visibility = "shared" } = req.body ?? {};
  if (!body || !String(body).trim()) return fail(res, 400, "invalid_input", "body is required");
  if (!["shared", "internal"].includes(visibility)) return fail(res, 400, "invalid_input", "visibility must be shared or internal");
  if (visibility === "internal" && req.user.role !== "admin") return fail(res, 403, "forbidden", "Only admins write internal notes");
  const n = { id: `n-${nextNoteId++}`, shipmentId: s.id, body: String(body).trim(), visibility, createdAt: new Date().toISOString(), author: { id: req.user.id, name: req.user.name, role: req.user.role } };
  notes.push(n);
  s.events.push({ id: `e-${nextEventId++}`, type: "note_added", note: `${req.user.name}: ${n.body}`, at: n.createdAt });
  res.status(201).json(n);
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(null, { swaggerOptions: { url: "/openapi.yaml" } }));
app.get("/openapi.yaml", (_req, res) => res.type("text/yaml").send(YAML.stringify(liveSpec())));
app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.get("/api/customers", (req, res) => {
  if (!req.user || req.user.role === "admin") return res.json({ data: CUSTOMERS });
  const mine = new Set([...shipments.values()].filter((s) => canSee(req, s)).map((s) => s.customerId));
  res.json({ data: CUSTOMERS.filter((c) => mine.has(c.id)) });
});

app.get("/api/shipments", (req, res) => {
  const { status, customerId, assignedTo, q } = req.query;
  const page = Math.max(1, parseInt(req.query.page ?? "1", 10) || 1);
  const pageSize = Math.min(50, Math.max(1, parseInt(req.query.pageSize ?? "10", 10) || 10));
  let list = [...shipments.values()].filter((s) => canSee(req, s));
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
  if (!s || !canSee(req, s)) return fail(res, 404, "not_found", `No shipment ${req.params.id}`);
  res.json(shipmentView(s, { withEvents: true }));
});

app.patch("/api/shipments/:id", (req, res) => {
  const s = shipments.get(req.params.id);
  if (!s || !canSee(req, s)) return fail(res, 404, "not_found", `No shipment ${req.params.id}`);
  if (!adminOnly(req, res)) return;
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
  let list = [...exceptions.values()].filter((x) => canSee(req, shipments.get(x.shipmentId)));
  if (state === "open") list = list.filter((x) => !x.resolvedAt);
  else if (state === "resolved") list = list.filter((x) => x.resolvedAt);
  if (severity) list = list.filter((x) => x.severity === severity);
  list.sort((a, b) => a.openedAt.localeCompare(b.openedAt));
  res.json({ data: list });
});

app.post("/api/shipments/:id/exceptions", (req, res) => {
  const s = shipments.get(req.params.id);
  if (!s || !canSee(req, s)) return fail(res, 404, "not_found", `No shipment ${req.params.id}`);
  if (!adminOnly(req, res)) return;
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
  if (!x || !canSee(req, shipments.get(x.shipmentId))) return fail(res, 404, "not_found", `No exception ${req.params.id}`);
  if (!adminOnly(req, res)) return;
  if (x.resolvedAt) return fail(res, 409, "already_resolved", "Exception is already resolved");
  const { resolution } = req.body ?? {};
  if (!resolution || !String(resolution).trim()) return fail(res, 400, "invalid_input", "resolution is required");
  x.resolvedAt = new Date().toISOString();
  x.resolution = String(resolution).trim();
  shipments.get(x.shipmentId).events.push({ id: `e-${nextEventId++}`, type: "exception_resolved", note: x.resolution, at: x.resolvedAt });
  res.json(x);
});

app.post("/api/admin/reset", (req, res) => {
  const { dataset } = req.query;
  if (dataset !== undefined && !DATASETS[dataset])
    return fail(res, 400, "invalid_input", `dataset must be one of ${Object.keys(DATASETS).join(", ")}`);
  if (dataset !== undefined) useDataset(dataset);
  seed();
  notesSeeded = false;
  if (addons.roles) ensureNotes();
  res.json({ ok: true, dataset: datasetName, shipments: shipments.size, exceptions: exceptions.size });
});

app.use((_req, res) => fail(res, 404, "not_found", "No such route"));

app.listen(PORT, () => console.log(JSON.stringify({ at: new Date().toISOString(), msg: `listening on http://localhost:${PORT}`, dataset: datasetName, docs: `http://localhost:${PORT}/docs` })));
