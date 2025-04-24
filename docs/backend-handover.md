# Backend Handover Checklist

This checklist ensures the NSEViz backend is production-ready and meets all project standards before handover.

---

- [ ] **All Automated Tests Pass**
  - Run all backend tests:
    ```sh
    pytest
    ```
  - All tests must pass with no errors or failures.

- [ ] **Code Linting (flake8)**
  - Lint all backend Python code:
    ```sh
    flake8 app/
    ```
  - No linting errors or warnings should remain.

- [ ] **Documentation Complete**
  - Confirm API contract and usage are fully documented in [`docs/api.md`](./api.md).
  - All public functions and endpoints have docstrings and type hints (see codebase).

---

**Notes:**
- No manual testing is required or allowed; all steps must be automated and verifiable.
- If any item is incomplete, address it before handover.

---

*Prepared as per project TDD, documentation, and handover principles.*
