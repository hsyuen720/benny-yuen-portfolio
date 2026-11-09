#!/bin/sh

# Revalidate cached Firestore content
# Usage: sh scripts/revalidate.sh [collection]
# Example: sh scripts/revalidate.sh projects   (one collection)
#          sh scripts/revalidate.sh            (every collection)

# Load environment variables from .env.local
if [ -f .env.local ]; then
  # Export variables from .env.local, ignoring comments and empty lines
  while IFS='=' read -r key value; do
    # Skip comments and empty lines
    case "$key" in
      \#*|'') continue ;;
    esac
    # Remove leading/trailing whitespace and export
    key=$(echo "$key" | tr -d ' ')
    value=$(echo "$value" | tr -d '\r')
    export "$key=$value"
  done < .env.local
fi

# Optional collection tag; empty revalidates every collection
TAG=${1:-""}

# Default to localhost:3000 if NEXT_PUBLIC_URL is not set
URL=${NEXT_PUBLIC_URL:-"http://localhost:3000"}

# Check if REVALIDATE_SECRET is set
if [ -z "$REVALIDATE_SECRET" ]; then
  echo "❌ Error: REVALIDATE_SECRET is not set"
  echo "Please add it to your .env.local file"
  exit 1
fi

echo "🔄 Revalidating cache..."
echo "📍 URL: $URL"
echo "🏷  Tag: ${TAG:-all collections}"

QUERY=""
if [ -n "$TAG" ]; then
  QUERY="?tag=$TAG"
fi

# The secret goes in a header so it never lands in server or proxy logs
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST -H "x-revalidate-secret: $REVALIDATE_SECRET" "$URL/api/revalidate$QUERY")

# Extract status code (last line)
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)

# Extract body (everything except last line)
BODY=$(echo "$RESPONSE" | sed '$d')

# Check status code
if [ "$HTTP_CODE" -eq 200 ]; then
  echo "✅ Cache revalidated successfully!"
  echo "$BODY"
else
  echo "❌ Revalidation failed with status code: $HTTP_CODE"
  echo "$BODY"
  exit 1
fi
