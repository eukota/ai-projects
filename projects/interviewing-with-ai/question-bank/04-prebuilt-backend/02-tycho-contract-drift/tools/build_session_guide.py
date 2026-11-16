import html, re, sys

"""Build session-guide.html: an interviewer-only page with the session steps, copy-ready commands, and the
brief and instructions exactly as the candidate receives them. Spoilers inside: do not screen share.

Usage:  python3 -I tools/build_session_guide.py [tunnel_url]
Output: session-guide.html next to the README (gitignored, because it holds your tunnel URL).
"""
import os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = sys.argv[1] if len(sys.argv) > 1 else "https://YOUR-TUNNEL.trycloudflare.com"


def inline(s):
    s = html.escape(s)
    s = re.sub(r"`([^`]+)`", r"<code>\1</code>", s)
    s = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", s)
    s = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r"<span class='link'>\1</span>", s)
    return s


def md(text):
    out, in_ul, in_ol = [], False, False

    def close():
        nonlocal in_ul, in_ol
        if in_ul:
            out.append("</ul>")
            in_ul = False
        if in_ol:
            out.append("</ol>")
            in_ol = False

    for line in text.splitlines():
        if not line.strip():
            close()
            continue
        m = re.match(r"^(#{1,3}) (.*)", line)
        if m:
            close()
            lvl = len(m.group(1)) + 1
            out.append("<h%d>%s</h%d>" % (lvl, inline(m.group(2)), lvl))
        elif re.match(r"^- ", line):
            if not in_ul:
                close()
                out.append("<ul>")
                in_ul = True
            out.append("<li>%s</li>" % inline(line[2:]))
        elif re.match(r"^\d+\. ", line):
            if not in_ol:
                close()
                out.append("<ol>")
                in_ol = True
            out.append("<li>%s</li>" % inline(re.sub(r"^\d+\. ", "", line)))
        else:
            close()
            out.append("<p>%s</p>" % inline(line))
    close()
    return "\n".join(out)


brief = md(open(ROOT + "/01-brief.md").read())
readme = md(open(ROOT + "/03-candidate-instructions.md").read())


def cmd(c, label=""):
    return ("<div class='cmd'><code data-cmd=\"%s\">%s</code><button type='button' onclick='copyCmd(this)'>Copy</button></div>"
            % (html.escape(c), html.escape(c)))


PAGE = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tycho Mock Session Guide</title>
<style>
:root{--bg:#f6f5f2;--card:#fff;--ink:#1d1d1b;--mute:#6b6a64;--line:#dedbd2;--accent:#1f5f8b;--warn:#b4501e;--ok:#2d7a4f;--code:#efede6}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#161715;--card:#201f1d;--ink:#ecebe6;--mute:#9b9a92;--line:#34332f;--accent:#6bb0e0;--warn:#e8915f;--ok:#6fc895;--code:#2a2926}}
:root[data-theme="dark"]{--bg:#161715;--card:#201f1d;--ink:#ecebe6;--mute:#9b9a92;--line:#34332f;--accent:#6bb0e0;--warn:#e8915f;--ok:#6fc895;--code:#2a2926}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
.wrap{max-width:900px;margin:0 auto;padding:24px 16px 64px}
h1{font-size:1.7rem;margin:0 0 4px}
.sub{color:var(--mute);margin:0 0 20px}
.bar{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin-bottom:20px}
.bar label{font-size:.8rem;color:var(--mute);display:block;margin-bottom:4px}
.bar input{width:100%;padding:8px 10px;border:1px solid var(--line);border-radius:8px;background:var(--code);color:var(--ink);font:14px ui-monospace,Menlo,monospace}
.bar .row{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}
.bar a{font-size:.85rem;color:var(--accent)}
.timeline{display:flex;gap:4px;margin:0 0 24px;flex-wrap:wrap}
.timeline a{flex:1 1 110px;text-decoration:none;color:var(--ink);background:var(--card);border:1px solid var(--line);border-radius:10px;padding:8px 10px;font-size:.85rem}
.timeline a b{display:block;color:var(--accent)}
.timeline a span{color:var(--mute);font-size:.78rem}
.step{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:16px 18px;margin-bottom:16px}
.step h2{margin:0 0 2px;font-size:1.15rem}
.step .time{color:var(--mute);font-size:.85rem;margin-bottom:10px}
.tag{display:inline-block;font-size:.72rem;font-weight:600;letter-spacing:.04em;text-transform:uppercase;border-radius:6px;padding:1px 7px;margin-right:6px}
.t-say{background:color-mix(in srgb,var(--accent) 16%,transparent);color:var(--accent)}
.t-run{background:color-mix(in srgb,var(--ok) 16%,transparent);color:var(--ok)}
.t-listen{background:color-mix(in srgb,var(--warn) 16%,transparent);color:var(--warn)}
.line{margin:8px 0}
.cmd{display:flex;gap:8px;align-items:center;background:var(--code);border-radius:8px;padding:6px 8px 6px 12px;margin:6px 0}
.cmd code{flex:1;font:13px ui-monospace,Menlo,monospace;overflow-x:auto;white-space:pre;background:none;padding:0}
button{border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:6px;padding:3px 10px;font-size:.8rem;cursor:pointer}
button:hover{border-color:var(--accent)}
table{border-collapse:collapse;width:100%;font-size:.88rem;margin:8px 0}
th,td{text-align:left;border-bottom:1px solid var(--line);padding:5px 8px;vertical-align:top}
th{color:var(--mute);font-weight:600}
details{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:0 18px;margin-bottom:16px}
details summary{cursor:pointer;padding:14px 0;font-weight:600}
details[open] summary{border-bottom:1px solid var(--line);margin-bottom:8px}
.doc h2{font-size:1.25rem;margin:14px 0 6px}.doc h3{font-size:1.05rem;margin:14px 0 4px;color:var(--accent)}.doc h4{font-size:.95rem;margin:10px 0 2px}
.doc p,.doc li{margin:4px 0}.doc ul,.doc ol{padding-left:22px}
code{background:var(--code);border-radius:4px;padding:1px 5px;font:.88em ui-monospace,Menlo,monospace}
.link{color:var(--accent)}
.hand{border-left:4px solid var(--ok);padding-left:12px;margin:8px 0 12px;color:var(--mute);font-size:.9rem}
.spoil{border-left:4px solid var(--warn)}
.ok{color:var(--ok);font-weight:600}
@media (max-width:560px){.wrap{padding:16px 12px 48px}}
</style>
</head>
<body>
<div class="wrap">
<h1>Mock session: Tycho Bulk Freight</h1>
<p class="sub">Build a frontend on a supplied API, then adapt when it changes. Interviewer view: contains spoilers, do not screen share.</p>

<div class="bar">
<label for="u">Public API URL (the tunnel). Edit it if you restart the tunnel; every command below updates.</label>
<input id="u" value="__URL__" spellcheck="false" oninput="setUrl(this.value)">
<div class="row"><a id="docs" href="#" target="_blank" rel="noopener">Open /docs</a><a id="sw" href="#" target="_blank" rel="noopener">Open /openapi.yaml</a></div>
</div>

<nav class="timeline">
<a href="#s0"><b>0 Before</b><span>setup</span></a>
<a href="#s1"><b>1 Hand-off</b><span>0:00</span></a>
<a href="#s2"><b>2 Build</b><span>0:05 to 0:40</span></a>
<a href="#s3"><b>3 Break</b><span>~0:40</span></a>
<a href="#s4"><b>4 Roles</b><span>stretch</span></a>
<a href="#s5"><b>5 Debrief</b><span>last 10 min</span></a>
</nav>

<section class="step" id="s0">
<h2>0. Before the candidate joins</h2><div class="time">5 minutes</div>
<div class="line"><span class="tag t-run">Check first</span> It may already be running. If this prints <code>{"ok":true}</code>, skip the start commands (starting twice gives <code>EADDRINUSE</code>):</div>
__C_LOCAL__
<div class="line"><span class="tag t-run">Run</span> To start fresh, <code>tools/start-server.sh</code> frees port 4000 first, then starts the API on the minerals data. Then, in a second terminal, the public tunnel (it prints the URL to paste in the box above).</div>
__C_SERVER__
__C_TUNNEL__
<div class="line"><span class="tag t-run">Check</span> Health through the public URL, and that no break or add-on is on:</div>
__C_CHECK__
__C_STATE__
<div class="line">Expect <code>{"ok":true}</code>, then <code>"mode":"off"</code> and <code>"roles":false</code>. Reset data if you rehearsed:</div>
__C_RESET__
</section>

<section class="step" id="s1">
<h2>1. Hand-off</h2><div class="time">0:00. This is everything the candidate receives.</div>
<div class="hand">Send: the <strong>README</strong> and <strong>brief</strong> (below, shown exactly as the candidate gets them) plus the <strong>API URL</strong>. Nothing else. Not <code>backend/</code>, not the instructor notes.</div>
<div class="line"><span class="tag t-say">Say</span> "You'll build a frontend on an API that already exists. Read the brief, ask me anything you like, and think out loud. I'll answer as the business."</div>
<div class="line">Answer clarifying questions in character. Useful answers if asked: the first demo audience is the dispatchers; "keeping up" means exceptions opened vs cleared; priority customers are marked by tier; no deadline beyond today.</div>
</section>

<section class="step" id="s2">
<h2>2. Build</h2><div class="time">0:05 to about 0:40</div>
<div class="line"><span class="tag t-listen">Listen</span> Clarifying questions first. One user, one journey, and what they leave out. Do they call the API with <code>curl</code> or trust the docs? Do they give the AI real response shapes? Do they check empty and error states?</div>
<div class="line">Traps waiting for the candidate (none are announced):</div>
<table>
<tr><th>Trap</th><th>How it bites</th></tr>
<tr><td><code>eta</code> is <code>null</code> at customs</td><td>"Invalid Date" or a crash</td></tr>
<tr><td>Delivered returns 409 <code>open_exception</code></td><td>Status change fails while an exception is open</td></tr>
<tr><td>Status moves are restricted</td><td>A dropdown offering every status produces 409s</td></tr>
<tr><td><code>/api/exceptions</code> defaults to <code>state=open</code></td><td>Resolved list looks empty</td></tr>
<tr><td><code>pageSize</code> silently caps at 50</td><td>"All shipments" is wrong past 50</td></tr>
</table>
<div class="line">Interject lightly: "Why did you accept that?" "How do you know that works?"</div>
</section>

<section class="step spoil" id="s3">
<h2>3. Break the API</h2><div class="time">Once the candidate has a working UI. Do not announce it.</div>
<div class="line"><span class="tag t-say">Say</span> "Can you click around and show me it working again?" (after you flip the switch)</div>
<div class="line"><span class="tag t-run">Run</span> Start with <code>rename</code>: nothing crashes, everything just looks unassigned.</div>
__C_B_RENAME__
<table>
<tr><th>Mode</th><th>What changes</th><th>Shows up as</th></tr>
<tr><td><code>rename</code></td><td><code>assignedTo</code> becomes <code>owner</code></td><td>Silent: all shipments look unassigned</td></tr>
<tr><td><code>envelope</code></td><td><code>data</code> becomes <code>items</code>, <code>total</code> becomes <code>count</code></td><td>Loud: empty lists or a crash</td></tr>
<tr><td><code>nullstring</code></td><td>Every <code>null</code> becomes the string <code>"null"</code>, which is truthy</td><td>Unassigned count drops to 0, a dispatcher called "null", "Invalid Date" ETAs, open exceptions look resolved</td></tr>
<tr><td><code>flaky</code></td><td>Every third call returns 503</td><td>Random failures, needs retry and error states</td></tr>
</table>
__C_B_ENVELOPE__
__C_B_NULLSTRING__
__C_B_FLAKY__
<div class="line"><span class="tag t-run">Undo</span></div>
__C_B_OFF__
<div class="line"><span class="tag t-listen">Listen</span> Do they compare a live response with their types and the docs? Do they find <code>X-Api-Version: 2</code> in the network tab? Do they fix it in one place? Can they say how they'd know it's fixed?</div>
</section>

<section class="step spoil" id="s4">
<h2>4. Roles add-on (stretch)</h2><div class="time">Only if the candidate gets this far.</div>
<div class="line"><span class="tag t-say">Say</span> "We've been told this has to be secure. Different people should only see what's theirs, and there are admins who run it. I'll give you logins for each kind of user."</div>
<div class="line"><span class="tag t-run">Run</span> The candidate's open UI will start getting 401s.</div>
__C_R_ON__
<div class="line">Docs update live with login and notes. Give the candidate the sample logins (also shown in <code>/docs</code>):</div>
<table>
<tr><th>Role</th><th>Email</th><th>Sees</th></tr>
<tr><td>admin</td><td>scott@tycho.example<br>uhura@tycho.example</td><td>All 28 shipments, can change anything</td></tr>
<tr><td>shipper</td><td>ops@pilbara-ridge.example<br>dispatch@rbm-coop.example</td><td>Own shipments (about 10)</td></tr>
<tr><td>receiver</td><td>engineering@starfleet-engineers.example<br>labs@daystrom.example<br>geology@academy.example</td><td>Own shipments (about 6)</td></tr>
</table>
<div class="line">Rules: shippers and receivers read their own shipments and add shared notes. Admins only: change status or assignee, open or resolve exceptions, write internal notes.</div>
<div class="line"><span class="tag t-listen">Listen</span> Where the token lives, handling 401 and logout, hiding admin actions in the UI while treating the server as the real gate, a way to test each role. Planted gap: docs say a foreign shipment returns <strong>403</strong>, the server returns <strong>404</strong>.</div>
<div class="line"><span class="tag t-run">Undo</span></div>
__C_R_OFF__
</section>

<section class="step" id="s5">
<h2>5. Debrief</h2><div class="time">Last 10 minutes</div>
<ul>
<li>What did you decide not to build, and why?</li>
<li>Where did the AI help, and where did you override it?</li>
<li>How did you know the break was fixed? What would catch it next time (contract tests, typed client)?</li>
<li>What did you validate before calling it done? What would you do with more time?</li>
</ul>
<div class="line"><span class="tag t-run">Afterwards</span> Stop the tunnel (Ctrl-C in its terminal). Logs of what the candidate did: <code>backend/logs/server-latest.log</code>.</div>
</section>

<details open class="doc"><summary>What the candidate receives (1 of 2): the brief</summary>__BRIEF__</details>
<details class="doc"><summary>What the candidate receives (2 of 2): the instructions</summary>__README__</details>
</div>

<script>
var BASE = "__URL__";
function setUrl(v){
  v = v.trim().replace(/\\/$/, "");
  document.querySelectorAll("[data-cmd]").forEach(function(el){
    if(!el.dataset.tpl){ el.dataset.tpl = el.dataset.cmd; }
    var t = el.dataset.tpl.split(BASE).join(v);
    el.dataset.cmd = t; el.textContent = t; el.dataset.tpl = t;
  });
  BASE = v;
  document.getElementById("docs").href = v + "/docs/";
  document.getElementById("sw").href = v + "/openapi.yaml";
}
function copyCmd(btn){
  var t = btn.parentNode.querySelector("code").textContent;
  try { navigator.clipboard.writeText(t); } catch(e) {}
  var o = btn.textContent; btn.textContent = "Copied"; setTimeout(function(){ btn.textContent = o; }, 1100);
}
setUrl(BASE);
</script>
</body>
</html>
"""

U = URL
cmds = {
    "__C_SERVER__": cmd(ROOT + "/tools/start-server.sh"),
    "__C_LOCAL__": cmd("curl -s localhost:4000/api/health"),
    "__C_TUNNEL__": cmd(ROOT + "/tools/share-api.sh"),
    "__C_CHECK__": cmd("curl -s %s/api/health" % U),
    "__C_STATE__": cmd("curl -s %s/api/admin/break; curl -s %s/api/admin/addon" % (U, U)),
    "__C_RESET__": cmd("curl -s -X POST '%s/api/admin/reset?dataset=minerals'" % U),
    "__C_B_RENAME__": cmd("curl -X POST '%s/api/admin/break?mode=rename'" % U),
    "__C_B_ENVELOPE__": cmd("curl -X POST '%s/api/admin/break?mode=envelope'" % U),
    "__C_B_NULLSTRING__": cmd("curl -X POST '%s/api/admin/break?mode=nullstring'" % U),
    "__C_B_FLAKY__": cmd("curl -X POST '%s/api/admin/break?mode=flaky'" % U),
    "__C_B_OFF__": cmd("curl -X POST '%s/api/admin/break?mode=off'" % U),
    "__C_R_ON__": cmd("curl -X POST '%s/api/admin/addon?name=roles&state=on'" % U),
    "__C_R_OFF__": cmd("curl -X POST '%s/api/admin/addon?name=roles&state=off'" % U),
}
out = PAGE.replace("__BRIEF__", brief).replace("__README__", readme)
for k, v in cmds.items():
    out = out.replace(k, v)
out = out.replace("__URL__", html.escape(U))
open(ROOT + "/session-guide.html", "w").write(out)
print("wrote", ROOT + "/session-guide.html", len(out))
