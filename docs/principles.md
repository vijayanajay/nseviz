# NSEViz Development Principles

## 1. Philosophy & Approach
- **Follow Kailash Nadh’s philosophy:**
  - Start with the simplest working version.
  - Build only what is essential for the next step.
  - Iterate in small, testable increments.
  - Avoid overengineering or premature optimization.

## 2. Task Structure
- **Break all work into ≤2 hour tasks.**
- **Each task must be explicit and actionable.**
- **Document examples and expectations for each task.**

## 3. Phase-Based Implementation Protocol
- **Develop in clearly defined phases** (e.g., setup, backend, frontend, testing, deployment).
- **Each phase must be completed and reviewed before the next begins.**
- This ensures focus, quality, and minimal context switching, reducing integration issues and rework.

## 4. Test-Driven Development Protocol
- **Write tests before writing implementation code (TDD).**
- No feature or fix is complete without corresponding automated tests.
- This ensures reliability, reduces regressions, and clarifies requirements for all contributors.

## 5. Backend Principles
- **Use Flask for all backend logic.**
- **Expose a single `/api/heatmap-data` endpoint** with filtering via query parameters (category, index, sector, date).
- **Use yfinance as the only data source.**
- **All backend code must be tested with automated unit and contract tests (pytest).**
- **No manual API testing—automate everything.**
- **Backend must be fully implemented, tested, and documented before any frontend development begins.**

## 6. Structured Error Handling
- **Handle all errors in a consistent, structured way.**
- Backend APIs must return clear, machine-readable JSON error responses with codes and messages.
- Frontend must gracefully display errors to users and never crash.
- All errors must be logged with sufficient detail for debugging.

## 7. Environment Configuration Standard
- **Manage all configuration via environment variables or config files—never hardcode secrets.**
- Use `.env` files or equivalent for local development.
- Document all required environment variables and their purpose in the README or a dedicated config doc.
- Never commit secrets or sensitive configs to version control.

## 8. Separate Dev and Prod Environment Config Clearly
- **Maintain distinct configuration files or environment variable sets for development and production.**
- Never use production credentials in development or vice versa.
- Document the differences and ensure the correct config is loaded in each environment.

## 9. Frontend Principles
- **Use only minimal vanilla JS and D3.js.**
- **No frameworks or unnecessary complexity.**
- **Frontend must strictly follow the frontend-design.md specification for UI and components.**
- **All data must be fetched from the single backend endpoint.**
- **All frontend code must be tested with automated tools (Jest for JS, Cypress for UI, Stylelint for CSS).**
- **No manual UI testing—automate everything.**

## 10. Responsive Design Mandate
- **The frontend must be fully responsive.**
- Use fluid grids, media queries, and test across viewport sizes (desktop, tablet, mobile) for usability and visual consistency.
- All UI components must adapt gracefully to different screen sizes.

## 11. Deployment Preparation Protocol
- **Code must be production-ready before deployment:**
  - All tests passing
  - Code linted
  - Documentation updated
  - All environment variables/configs set
- Prepare deployment scripts or guides.
- Ensure the app can be deployed with minimal manual intervention.

## 12. Testing & Quality
- **No manual testing is allowed.**
- **All code must be covered by automated tests.**
- **Specify the testing tool in each task.**
- **Lint and document all code (use flake8 for Python, stylelint for CSS, etc).**

## 13. Accessibility
- **No accessibility enhancements are required.**
- **No ARIA, keyboard navigation, or color-blind modes.**

## 14. Documentation
- **Document all API contracts, request/response formats, and data schemas.**
- **Add code comments and documentation for all modules and functions.**
- **Prepare a handover checklist for both backend and frontend.**

## 15. Handover & Review
- **Frontend work starts only after backend is fully ready.**
- **Handover is only complete when all tests pass and documentation is up to date.**

---

These principles are mandatory for all contributors to the NSEViz project. They ensure clarity, simplicity, maintainability, and reliable delivery.
