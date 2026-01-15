#!/bin/sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$APP_DIR"

export PRISMA_CLIENT_ENGINE_TYPE="${PRISMA_CLIENT_ENGINE_TYPE:-binary}"

if ! command -v nest >/dev/null 2>&1; then
  npm i -g @nestjs/cli
  npm install
fi

npm run start:dev
