#!/usr/bin/env bash
# Start the exercise API in the foreground (minerals data). Frees the port first if something already holds it.
# Break mode and the roles add-on always start off. Log: backend/logs/server-latest.log
# Override the port with PORT=4010 ./tools/start-server.sh
set -euo pipefail
cd "$(dirname "$0")/../backend"
mkdir -p logs
[ -d node_modules ] || npm install --silent
PORT="${PORT:-4000}"
pids=$(lsof -tiTCP:"$PORT" -sTCP:LISTEN || true)
if [ -n "$pids" ]; then echo "Port $PORT in use by PID(s) $pids, stopping them"; kill $pids; sleep 1; fi
PORT="$PORT" npm start 2>&1 | tee logs/server-latest.log
