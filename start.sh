#!/bin/bash
echo "Starting SeeMenu..."

# Start backend
cd "$(dirname "$0")/backend"
node server.js &
BACKEND_PID=$!
echo "Backend started (PID $BACKEND_PID) at http://localhost:3001"

# Start frontend
cd "$(dirname "$0")/frontend"
npx vite &
FRONTEND_PID=$!
echo "Frontend starting at http://localhost:5173"

echo ""
echo "SeeMenu is running!"
echo "  Frontend: http://localhost:5173"
echo "  Backend:  http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers."

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null" EXIT
wait
