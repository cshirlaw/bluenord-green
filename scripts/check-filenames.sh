#!/usr/bin/env bash
set -e

DIR="public/reports"
if [ ! -d "$DIR" ]; then
  echo "ℹ️  $DIR does not exist; nothing to check."
  exit 0
fi

# Find files with uppercase letters, spaces, or underscores
if find "$DIR" -type f -print | grep -E '[A-Z]|[[:space:]]|_'; then
  echo "❌ Bad filenames in $DIR (must be lowercase kebab-case, no spaces/underscores)"
  exit 1
else
  echo "✅ Filenames OK"
fi
