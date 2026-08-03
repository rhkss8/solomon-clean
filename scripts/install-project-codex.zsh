#!/usr/bin/env zsh
set -euo pipefail

SCRIPT_DIR="${0:A:h}"
PROJECT_ROOT="${SCRIPT_DIR:h}"
SOURCE="$PROJECT_ROOT/project-codex/skills"
TARGET="$PROJECT_ROOT/.codex/skills"

mkdir -p "$TARGET"
cp -R "$SOURCE/." "$TARGET/"

echo "Installed project Codex skills -> $TARGET"
