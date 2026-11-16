#!/usr/bin/env bash
# Publish the local exercise API at a temporary public https URL (Cloudflare quick tunnel, no account needed).
# Needs `cloudflared` (brew install cloudflared). The URL dies when you press Ctrl-C.
# Anyone with the URL can read and write the data, so stop it when the session ends.
# Log: backend/logs/tunnel-latest.log
set -euo pipefail
cd "$(dirname "$0")/../backend"
mkdir -p logs
PORT="${PORT:-4000}"
command -v cloudflared >/dev/null || { echo "cloudflared not found. Install it: brew install cloudflared"; exit 1; }
curl -sf "localhost:$PORT/openapi.yaml" >/dev/null || { echo "API not running on port $PORT. Start it: tools/start-server.sh"; exit 1; }
cloudflared tunnel --url "http://localhost:$PORT" 2>&1 | tee logs/tunnel-latest.log
