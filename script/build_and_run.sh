#!/usr/bin/env bash
set -euo pipefail

npm ci
npm run typecheck
npm run lint
npm test
