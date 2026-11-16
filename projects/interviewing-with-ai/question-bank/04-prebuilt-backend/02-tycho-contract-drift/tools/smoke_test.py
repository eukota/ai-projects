#!/usr/bin/env python3
"""Smoke test for the exercise API: baseline traps, every break mode, and the roles add-on.

Usage:  python3 -I tools/smoke_test.py [base_url]        (default http://localhost:4000)

It resets the data and always leaves break mode and the roles add-on OFF. Do not run it against a
server a candidate is currently using. Exit code is 0 only if every check passes.
"""
import json
import sys
import urllib.error
import urllib.request

BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4000").rstrip("/")
results = []


def call(method, path, body=None, token=None):
    req = urllib.request.Request(BASE + path, method=method)
    req.add_header("content-type", "application/json")
    if token:
        req.add_header("Authorization", "Bearer " + token)
    data = json.dumps(body).encode() if body is not None else None
    try:
        with urllib.request.urlopen(req, data) as r:
            raw = r.read().decode()
            return r.status, (json.loads(raw) if raw[:1] in "{[" else raw), r.headers
    except urllib.error.HTTPError as e:
        raw = e.read().decode()
        try:
            return e.code, json.loads(raw), e.headers
        except ValueError:
            return e.code, raw, e.headers


def check(name, ok, detail=""):
    results.append(ok)
    print(("PASS  " if ok else "FAIL  ") + name + ("" if ok else "   -> " + str(detail)))


def set_break(mode):
    return call("POST", "/api/admin/break?mode=" + mode)[1]


def set_roles(state):
    return call("POST", "/api/admin/addon?name=roles&state=" + state)[1]


def shipments(token=None, query="pageSize=50"):
    s, d, _ = call("GET", "/api/shipments?" + query, token=token)
    return s, d


def login(email):
    return call("POST", "/api/auth/login", {"email": email})[1]["token"]


def main():
    set_break("off")
    set_roles("off")
    call("POST", "/api/admin/reset?dataset=minerals")

    print("== baseline ==")
    s, d = shipments()
    check("minerals dataset: 28 shipments with cargo", s == 200 and d["total"] == 28 and "cargo" in d["data"][0], d)
    check("trap: eta is null for a shipment at customs",
          any(x["status"] == "at_customs" and x["eta"] is None for x in d["data"]))
    check("trap: pageSize above 50 silently clamps", shipments(query="pageSize=500")[1]["pageSize"] == 50)
    check("trap: /api/exceptions defaults to open only",
          all(x["resolvedAt"] is None for x in call("GET", "/api/exceptions")[1]["data"]))
    open_ship = next(x for x in d["data"] if x["openExceptionCount"] > 0 and x["status"] == "out_for_delivery")
    s, b, _ = call("PATCH", "/api/shipments/" + open_ship["id"], {"status": "delivered"})
    check("trap: delivered blocked by open exception (409 open_exception)",
          s == 409 and b["error"]["code"] == "open_exception", b)
    s, b, _ = call("PATCH", "/api/shipments/S-1002", {"status": "booked"})
    check("trap: restricted status transition (409 invalid_transition)",
          s == 409 and b["error"]["code"] == "invalid_transition", b)
    s, spec, _ = call("GET", "/openapi.yaml")
    check("spec served, servers url is relative, no break or roles in it",
          s == 200 and "url: /" in spec and "/api/admin/break" not in spec and "/api/auth/login" not in spec)
    check("docs page served", call("GET", "/docs/")[0] == 200)
    _, h, hdr = call("GET", "/api/health")
    check("version header is 1 when healthy", hdr.get("X-Api-Version") == "1")
    check("login route does not exist while roles is off", call("POST", "/api/auth/login", {"email": "x"})[0] == 404)

    print("== break: rename ==")
    set_break("rename")
    _, d = shipments()
    check("assignedTo replaced by owner", "owner" in d["data"][0] and "assignedTo" not in d["data"][0], d["data"][0])
    check("version header is 2 while broken", call("GET", "/api/shipments/S-1001")[2].get("X-Api-Version") == "2")
    check("requests still accept assignedTo",
          call("PATCH", "/api/shipments/S-1001", {"assignedTo": "Scott"})[0] in (200, 400))

    print("== break: envelope ==")
    set_break("envelope")
    s, d = shipments()
    check("data/total become items/count", "items" in d and "count" in d and "data" not in d and "total" not in d, list(d))
    check("exceptions envelope changed too", "items" in call("GET", "/api/exceptions")[1])
    check("errors are not rewritten", call("GET", "/api/shipments/S-9999")[1]["error"]["code"] == "not_found")

    print("== break: nullstring ==")
    set_break("nullstring")
    call("POST", "/api/admin/reset?dataset=minerals")
    _, d = shipments()
    unassigned = [x for x in d["data"] if x["assignedTo"] == "null"]
    check("null assignedTo becomes the string 'null'", len(unassigned) > 0, d["data"][0])
    check("null eta becomes the string 'null'", any(x["eta"] == "null" for x in d["data"]))
    check("real values untouched", any(x["assignedTo"] not in (None, "null") for x in d["data"]))
    check("open exception resolvedAt becomes 'null'", call("GET", "/api/exceptions")[1]["data"][0]["resolvedAt"] == "null")

    print("== break: flaky ==")
    set_break("flaky")
    codes = [call("GET", "/api/customers")[0] for _ in range(6)]
    check("every third call returns 503", codes == [200, 200, 503, 200, 200, 503], codes)
    s, b, hdr = call("GET", "/api/customers")
    s2, b2, hdr2 = call("GET", "/api/customers")
    s3, b3, hdr3 = call("GET", "/api/customers")
    check("503 carries Retry-After", s3 == 503 and hdr3.get("Retry-After") == "1", (s, s2, s3))
    check("admin and health never fail while flaky",
          all(call("GET", "/api/admin/break")[0] == 200 and call("GET", "/api/health")[0] == 200 for _ in range(4)))

    print("== break: off and validation ==")
    check("bad mode rejected", call("POST", "/api/admin/break?mode=eta")[0] == 400)
    set_break("off")
    _, d = shipments()
    check("contract restored after off", "data" in d and "assignedTo" in d["data"][0]
          and any(x["assignedTo"] is None for x in d["data"]), list(d))

    print("== roles add-on ==")
    check("roles on", set_roles("on")["addons"]["roles"] is True)
    check("no token -> 401", call("GET", "/api/shipments")[0] == 401)
    check("health stays open", call("GET", "/api/health")[0] == 200)
    check("unknown email -> 401", call("POST", "/api/auth/login", {"email": "x@y"})[0] == 401)
    adm = login("scott@tycho.example")
    shp = login("ops@pilbara-ridge.example")
    rcv = login("labs@daystrom.example")
    na, nb, nc = (shipments(t)[1]["total"] for t in (adm, shp, rcv))
    check("admin sees all, shipper and receiver see subsets", na == 28 and 0 < nb < 28 and 0 < nc < 28, (na, nb, nc))
    mine = shipments(shp)[1]["data"][0]
    check("shipperId appears on shipments", mine.get("shipperId") == "sh-1" or "shipperId" in mine, mine)
    shp_ids = {x["id"] for x in shipments(shp)[1]["data"]}
    foreign = next(x["id"] for x in shipments(adm)[1]["data"] if x["id"] not in shp_ids)
    check("trap: foreign shipment is 404, though the spec says 403", call("GET", "/api/shipments/" + foreign, token=shp)[0] == 404)
    s, b, _ = call("GET", "/openapi.yaml")
    check("spec lists login and notes while roles is on", "/api/auth/login" in b and "/notes" in b and "403" in b)
    check("shipper cannot PATCH (403 forbidden)", call("PATCH", "/api/shipments/" + mine["id"], {"assignedTo": "Scott"}, shp)[0] == 403)
    check("shipper cannot resolve exceptions (403)", call("POST", "/api/exceptions/x-1/resolve", {"resolution": "x"}, shp)[0] in (403, 404))
    check("shipper cannot write internal note (403)",
          call("POST", "/api/shipments/%s/notes" % mine["id"], {"body": "x", "visibility": "internal"}, shp)[0] == 403)
    s, n, _ = call("POST", "/api/shipments/%s/notes" % mine["id"], {"body": "ETA question"}, shp)
    check("shipper can add a shared note", s == 201 and n["visibility"] == "shared" and n["author"]["role"] == "shipper", n)
    check("admin can add an internal note",
          call("POST", "/api/shipments/%s/notes" % mine["id"], {"body": "broker delay", "visibility": "internal"}, adm)[0] == 201)
    vis_shp = {x["visibility"] for x in call("GET", "/api/shipments/%s/notes" % mine["id"], token=shp)[1]["data"]}
    vis_adm = {x["visibility"] for x in call("GET", "/api/shipments/%s/notes" % mine["id"], token=adm)[1]["data"]}
    check("internal notes hidden from shipper, visible to admin", vis_shp == {"shared"} and "internal" in vis_adm, (vis_shp, vis_adm))
    check("shipper sees fewer exceptions than admin",
          len(call("GET", "/api/exceptions", token=shp)[1]["data"]) < len(call("GET", "/api/exceptions", token=adm)[1]["data"]))
    set_break("rename")
    check("breaks still work alongside roles", "owner" in shipments(adm)[1]["data"][0])
    set_break("off")
    check("roles off restores open access", set_roles("off")["addons"]["roles"] is False and call("GET", "/api/shipments")[0] == 200)
    check("login route gone again", call("POST", "/api/auth/login", {"email": "x"})[0] == 404)

    call("POST", "/api/admin/reset?dataset=minerals")


try:
    main()
finally:
    try:
        set_break("off")
        set_roles("off")
    except Exception:
        pass

failed = results.count(False)
print("\n%d checks, %d failed" % (len(results), failed))
sys.exit(1 if failed else 0)
