# File & Directory Purpose Reference

This document describes the purpose of every file and directory in the NSEViz codebase. If a file's purpose is unclear or it appears unnecessary, this is noted explicitly.

---

## Root Directory

- `.git/` — Git version control metadata. Required for source control.
- `.gitignore` — Specifies files and directories to be ignored by Git. Essential for clean version control.
- `.pytest_cache/` — Pytest cache data for test runs. Can be deleted safely; will be regenerated.
- `.stylelintrc.json` — Stylelint configuration for CSS linting. Required for enforcing CSS code quality.
- `.venv/` — Python virtual environment for managing dependencies. Not needed in repo; should be gitignored.
- `.windsurfrules` — Windsurf IDE rules/configuration. Required if using Windsurf IDE.
- `README.md` — Project overview, setup, and usage instructions. Essential documentation.
- `__tests__/` — Contains JavaScript test files (see inside for specifics).
- `app/` — Main backend Flask application code (see inside for details).
- `config.py` — Python config file. Likely centralizes environment/config settings.
- `docs/` — Project documentation (see inside for details).
- `pytest.ini` — Pytest configuration for Python tests.
- `requirements.txt` — Python dependencies. Essential for backend setup.
- `testresults.md` — Test results log. Should not be committed (per project rules).
- `tests/` — Python unit and integration tests (see inside for details).
- `tests_live/` — Python live/contract tests (see inside for details).

---

## app/
- `__init__.py` — Initializes the Flask app and configures routes.
- `routes.py` — Defines all Flask API endpoints.
- `__pycache__/` — Python bytecode cache. Not needed in repo; auto-generated.

---

## __tests__/
- `data-fetching.test.js` — JS test for data fetching logic.
- `treemap_drilldown.test.js` — JS test for treemap drilldown logic.
- `index.test.js` — JS test (general or entry point).

---

## docs/
- `api.md` — Backend API contract documentation.
- `files_info.md` — This file. Describes file/directory purposes.
- `memory.md` — Documentation of memory/context handling.
- `prd.md` — Product requirements document.
- `principles.md` — Project philosophy and guidelines.
- `tasks.md` — Task breakdown and status tracking.

---

## tests/
- `test_api_heatmap_data.py` — Unit tests for the `/api/heatmap-data` endpoint.
- `test_cors.py` — Tests for CORS headers and behavior.
- `test_heatmap_data.py` — Detailed backend data logic tests.
- `__pycache__/` — Python bytecode cache. Not needed in repo; auto-generated.

---

## tests_live/
- `.gitkeep` — Ensures the directory exists in git (empty placeholder).
- `README.md` — Explains live/contract testing purpose.
- `test_api_contract_requests.py` — Contract tests for API endpoints.
- `test_yfinance_live.py` — Live tests for yfinance integration.
- `__pycache__/` — Python bytecode cache. Not needed in repo; auto-generated.

---

## Other Notes
- `testresults.md` — Should NOT be committed; only for local test result logs.
- `.venv/`, `__pycache__/`, `.pytest_cache/` — All are auto-generated and should be gitignored.
- If any of these are committed, they should be deleted from the repo.
- If any file is unclear or not referenced in docs or configs, consider reviewing its necessity.
