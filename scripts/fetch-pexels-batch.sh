#!/bin/bash
# Batch fetch Pexels images for multiple ports
# Usage: ./scripts/fetch-pexels-batch.sh port1 port2 port3...

set -e

if [ $# -eq 0 ]; then
  echo "Usage: ./scripts/fetch-pexels-batch.sh <port-slug> [port-slug...]"
  echo "Example: ./scripts/fetch-pexels-batch.sh alesund bergen lisbon"
  exit 1
fi

echo "🖼️  Fetching Pexels images for $# ports..."
echo ""

SUCCESS=0
FAILED=0

for PORT in "$@"; do
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "📍 Processing: $PORT"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  
  if node scripts/fetch-pexels-images.js --port="$PORT"; then
    ((SUCCESS++))
    echo "✅ $PORT completed"
  else
    ((FAILED++))
    echo "❌ $PORT failed"
  fi
  
  echo ""
  
  # Rate limiting between ports (Pexels API)
  if [ "$PORT" != "${@: -1}" ]; then
    echo "⏳ Waiting 2 seconds before next port..."
    sleep 2
  fi
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Summary: $SUCCESS succeeded, $FAILED failed"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
