#!/bin/sh

# Revalidate cache script
# Usage: sh scripts/revalidate.js [path]
# Example: sh scripts/revalidate.js /en

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

# Get the path from argument or default to root
PATH_TO_REVALIDATE=${1:-"/"}

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
echo "📂 Path: $PATH_TO_REVALIDATE"

# Make the request using curl
RESPONSE=$(curl -s -w "\n%{http_code}" "$URL/api/revalidate?secret=$REVALIDATE_SECRET&path=$PATH_TO_REVALIDATE")

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
