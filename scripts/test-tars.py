#!/usr/bin/env python3
"""Behavior checks for the project-local TARS harness."""

from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
TARS_SOURCE = (ROOT / "tars").read_text(encoding="utf-8")


def load_tars(root: Path) -> dict[str, object]:
    namespace: dict[str, object] = {"__name__": "tars_test_module"}
    exec(compile(TARS_SOURCE, "tars", "exec"), namespace)
    namespace["ROOT"] = root
    namespace["DOCS"] = root / "docs"
    namespace["SERVICE_DEFINITION"] = root / "docs/service-definition.md"
    namespace["MVP_TODO"] = root / "docs/mvp-todo.md"
    namespace["START_SESSION"] = root / "docs/start-session.md"
    return namespace


class TarsBehaviorTests(unittest.TestCase):
    def test_help_and_acceptance_execute(self) -> None:
        for args in (["--help"], ["acceptance"]):
            result = subprocess.run(
                [sys.executable, "tars", *args],
                cwd=ROOT,
                check=False,
                text=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
            )
            self.assertEqual(result.returncode, 0, result.stdout)

    def test_verification_uses_only_available_package_scripts(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "package.json").write_text(
                json.dumps({"scripts": {"type-check": "tsc --noEmit", "lint": "eslint .", "dev": "next dev"}}),
                encoding="utf-8",
            )
            (root / "pnpm-lock.yaml").touch()
            tars = load_tars(root)
            checks = tars["project_verification_checks"]()
            self.assertEqual(checks, [("typecheck", "pnpm run type-check"), ("lint", "pnpm run lint")])

    def test_verification_allows_projects_without_package_json(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            tars = load_tars(Path(directory))
            self.assertEqual(tars["project_verification_checks"](), [])

    def test_project_can_select_a_narrow_verification_profile(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "package.json").write_text(
                json.dumps({
                    "scripts": {"type-check": "tsc --noEmit", "lint": "eslint ."},
                    "tars": {"verify": ["type-check"]},
                }),
                encoding="utf-8",
            )
            tars = load_tars(root)
            self.assertEqual(tars["project_verification_checks"](), [("typecheck", "npm run type-check")])

    def test_router_keeps_team_small_and_user_request_first(self) -> None:
        routing = (ROOT / "docs/work-routing.md").read_text(encoding="utf-8")
        skill = (ROOT / ".codex/skills/tars-orchestrator/SKILL.md").read_text(encoding="utf-8")
        self.assertIn("latest user correction", routing)
        self.assertIn("at most two parallel workers", skill)
        self.assertIn("Automatically advancing to another todo", routing)

    def test_optional_design_aid_is_not_required(self) -> None:
        self.assertIn("impeccable skill: optional", TARS_SOURCE)
        self.assertNotIn(
            "structure: impeccable skill exists",
            TARS_SOURCE,
        )


if __name__ == "__main__":
    unittest.main(verbosity=2)
