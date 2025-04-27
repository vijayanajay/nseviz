# NSEViz Project Tasks (WBS, ≤2h per task)

---
**Stats:**
- Total Tasks: 38
- Completed: 37
- % Complete: 97%
- Completed Effort: 40.4h
- Pending Effort: 11.5h

| Task ID | Description | Status | Est. Time | Time Taken |
|---------|-------------|--------|-----------|------------|
| B1.1    | Set up Python virtual environment and install Flask & yfinance | ✅ | 1h        | 1h         |
| B1.2    | Initialize Flask project structure | ✅ | 1.5h      | 1.5h       |
| B1.3    | Draft and document API contract in docs/api.md | ✅ | 2h        | 2h         |
| B1.4    | Set up CORS in Flask using flask-cors to allow frontend JS access | ✅ | 1h        | 1h         |
| B2.1    | Implement /api/heatmap-data endpoint in routes.py that returns static/mock JSON data matching the documented schema | ✅ | 1h        | 1h         |
| B2.2    | Add error handling for the endpoint: return 400 for invalid params, 500 for server errors, with JSON error messages. Example: `{ "error": "Invalid sector" }`. | ✅ | 1h        | 1h         |
| B3.1    | Use yfinance to fetch technical chart data for requested index/sector/stock. Example: `import yfinance as yf; yf.download('^NSEI', period='1d')`. | ✅ | 1.5h      | 1.5h        |
| B3.2    | Implement logic to filter/group yfinance data by category, index, sector as per query params. Example: filter stocks in the FINANCE sector from NIFTY50. | ✅ | 1.5h      | 1.5h        |
| B3.3    | Transform raw yfinance data to the frontend schema: include symbol, name, price, change %, volume, etc. Example output: `[ { "symbol": "HDFCBANK", "name": "HDFC Bank", "price": 1600.5, "change": 1.2 } ]`. | ✅ | 2h        | 1h         |
| B3.4    | Implement support for date-based data fetching (latest and historical). Example: `/api/heatmap-data?date=2024-04-01` returns data for that date. | ✅ | 1.5h      | 1h         |
| B4.1    | Write unit tests for /api/heatmap-data (mock data) using `pytest`. Example: test valid response, test invalid sector param. | ✅ | 1h        | 1h         |
| B4.2    | Write unit tests for /api/heatmap-data (yfinance data) using `pytest` and `unittest.mock` to mock yfinance calls. | ✅ | 1.5h      | 1.5h         |
| B4.3    | Implement automated API contract tests using `pytest` and `requests` to ensure endpoint returns correct schema for all query param combinations. | ✅ | 2h        | 2h         |
| B4.4    | Add logging for requests and errors using Python's `logging` module. Log every request and error with timestamp and params. | ✅ | 1h        | 1h         |
| B4.5    | Refactor code for clarity and maintainability: add docstrings, type hints, and inline comments. Example: `def get_heatmap_data(index: str, sector: str) -> dict:` | ✅ | 1.5h      | 1h         |
| B5.1    | Document endpoint, query params, and response schema in `docs/api.md` with request/response examples. | ✅ | 1h        | 1h         |
| B5.2    | Prepare backend handover checklist: all tests passing (pytest), code linted (flake8), and documentation complete. | ✅ | 1h        | 1h         |
| F6.1    | Create static `index.html` with containers for heatmap/treemap, controls, navbar, and footer (now in frontend/index.html) | ✅ | 1h        | 0.5h         |
| F6.2    | Create `main.js` and link to HTML (now in frontend/main.js) | ✅ | 1h        | 0.1h         |
| F6.3    | Add CSS files: `base.css`, `components.css`, `layouts.css`, `dark-mode.css` (now in frontend/) | ✅ | 1h        | 0.1h         |
| F7.1    | Implement Navbar (logo, navigation, date display) in HTML and style in `components.css`. Example: `<nav><img src="logo.svg"> <span>Indian Stock Market Heatmap</span> <span id="date"></span></nav>` | ✅ | 1.5h | 1h |
| F7.2    | Implement Index Selector as segmented control in HTML and JS. Example: `<button data-index="NIFTY50">Nifty 50</button>`; add event listeners in JS. | ✅ | 1.5h | 1h |
| F7.3    | Implement Date Picker with calendar overlay and focus states using vanilla JS. Example: `<input type="date" id="datepicker">` and style overlay in CSS. | ✅ | 2h | 0.3h |
| F7.4    | Implemented responsive CSS Grid for #treemap in layouts.css: 12 columns on desktop, 4 on tablet, 1 on mobile. Added Cypress test for layout responsiveness. | ✅ | 1.5h | 0.2h |
| F7.5    | Implement Card, Pill/Tag, Tabs, Accordion, Ad Slot, Mobile Navigation, Snapshot Cards, Mobile Sheet Modal as per frontend-design.md, each as separate HTML/CSS components. | ✅ | 2.5h | 1.5h |
| F8.1    | Implement heatmap color legend UI in index.html per frontend-design.md. Test with Cypress. | ✅ | 1h | 0.5h |
| F8.2    | Add sector/index dropdown filters with D3.js, fetch data from backend on change. Test with Jest & Cypress. | ✅ | 1.5h | 1.5h |
| F8.3    | Implement responsive grid layout for heatmap using CSS Grid. Test with Cypress (viewport tests). | ✅ | 1h | 0.2h |
| F8.4    | Add loading and error states in UI for API fetches. Test with Jest. | ✅ | 0.5h | 0.5h |
| F8.5    | Optimize frontend data fetch: debounce filter changes, show spinner. Test with Jest. | ✅ | 0.5h | 0.5h |
| F8.6    | Prepare production-ready frontend build (minify CSS/JS, update README deploy section). Test with build script. | ✅ | 1h | 1h |
| F9.1    | Set up D3.js treemap/heatmap with mock data. Example: use D3's `d3.treemap()` and render boxes in `#treemap` container. | ✅ | 2h        | 2h         |
| F9.2    | Integrate real API data into D3.js treemap/heatmap. Example: update D3 data binding to use fetched data. | ✅ | 1.5h | 0.5h |
<!-- Completed: Real API data is now mapped and rendered in D3 treemap. Jest-tested integration. Minimal, per spec. -->
| F9.3    | Add color coding and sizing logic according to performance and market cap, as per palette in frontend-design.md. Example: set fill color based on `change` value. | ✅ | 1.5h | 1.5h |
| F9.4    | Add tooltips and interactivity (hover, click, modal sheet on mobile) using D3 event handlers. Example: `on('mouseover', ...)` to show tooltip div. | ⬜ | 2h |  |
| F9.5    | Implement sector/category drilldown: clicking a sector filters the treemap. Example: update fetch call with new sector param and re-render. | ⬜ | 1.5h |  |
| F10.1   | Write unit tests for JS data-fetching functions using Jest. Example: mock fetch and assert correct API call and data parsing. | ⬜ | 1h |  |
| F10.2   | Write integration tests for D3.js rendering using Jest and jsdom. Example: assert correct number of SVG nodes rendered for input data. | ⬜ | 1.5h |  |
| F10.3   | Write automated UI tests for index selector, date picker, and interactions using Cypress. Example: simulate user clicking index selector and verify treemap updates. | ⬜ | 2h |  |
| F10.4   | Write CSS linting tests using Stylelint for all CSS files. Example: add stylelint config and run `stylelint *.css`. | ✅ | 1h | 1h |
| F10.5   | Add code comments and documentation to JS, HTML, and CSS files as per project standards. | ⬜ | 1.5h |  |
| F11.1   | Ensure all frontend automated tests pass (Jest, Cypress, Stylelint). Example: run `npm test` and `npx cypress run`. | ⬜ | 1h |  |
| F11.2   | Prepare frontend handover checklist: all tests passing, code linted, documentation complete. | ⬜ | 1h |  |
| D1.1    | Prepare deployment scripts and documentation for backend and frontend. Test deployment on local server. | ⬜ | 1h |  |

---
## [2025-04-25] Backend Code Refactor for Clarity & Maintainability
- All backend code (`app/routes.py`, `app/__init__.py`) now includes comprehensive docstrings, type hints, and clarifying inline comments.
- All public functions, Flask handlers, and helpers are fully documented and typed.
- Code is now easier to read, maintain, and extend, in line with project and TDD principles.
- No implementation logic was changed; only documentation, typing, and comments were added.

---

## Frontend (Minimal JS + D3.js, starts after backend is ready, per frontend-design.md)

### 6. Project Setup
- **F6.1** (1h): Create static `index.html` with containers for heatmap/treemap, controls, navbar, and footer (now in frontend/index.html) | ✅ | 1h        | 0.5h         |
- **F6.2** (1h): Create `main.js` and link to HTML (now in frontend/main.js) | ✅ | 1h        | 0.1h         |
- **F6.3** (1h): Add CSS files: `base.css`, `components.css`, `layouts.css`, `dark-mode.css` (now in frontend/) | ✅ | 1h        | 0.1h         |

### 7. Core Components (UI Skeleton)
- **F7.1** (1.5h): Implement Navbar (logo, navigation, date display) in HTML and style in `components.css`. Example: `<nav><img src="logo.svg"> <span>Indian Stock Market Heatmap</span> <span id="date"></span></nav>` | ✅ | 1.5h | 1h |
- **F7.2** (1.5h): Implement Index Selector as segmented control in HTML and JS. Example: `<button data-index="NIFTY50">Nifty 50</button>`; add event listeners in JS. | ✅ | 1.5h | 1h |
- **F7.3** (2h): Implement Date Picker with calendar overlay and focus states using vanilla JS. Example: `<input type="date" id="datepicker">` and style overlay in CSS. | ✅ | 2h | 0.3h |
- **F7.4** (1.5h): Implemented responsive CSS Grid for #treemap in layouts.css: 12 columns on desktop, 4 on tablet, 1 on mobile. Added Cypress test for layout responsiveness. | ✅ | 1.5h | 0.2h |
- **F7.5** (2.5h): Implement Card, Pill/Tag, Tabs, Accordion, Ad Slot, Mobile Navigation, Snapshot Cards, Mobile Sheet Modal as per frontend-design.md, each as separate HTML/CSS components. | ✅ | 2.5h | 1.5h |

### 8. API Integration (with tested backend)
- **F8.1** (1h): Implement heatmap color legend UI in index.html per frontend-design.md. Test with Cypress. | ✅ | 1h | 0.5h |
- **F8.2** (1.5h): Add sector/index dropdown filters with D3.js, fetch data from backend on change. Test with Jest & Cypress. | ✅ | 1.5h | 1.5h |
- **F8.3** (1h): Implement responsive grid layout for heatmap using CSS Grid. Test with Cypress (viewport tests). | ✅ | 1h | 0.2h |
- **F8.4** (0.5h): Add loading and error states in UI for API fetches. Test with Jest. | ✅ | 0.5h | 0.5h |
- **F8.5** (0.5h): Optimize frontend data fetch: debounce filter changes, show spinner. Test with Jest. | ✅ | 0.5h | 0.5h |
- **F8.6** (1h): Prepare production-ready frontend build (minify CSS/JS, update README deploy section). Test with build script. | ✅ | 1h | 1h |
- **F8.6 Complete:** Production-ready frontend build created, README updated, and build script tested.

### 9. D3.js Heatmap/Treemap Visualization
- **F9.1** (2h): Set up D3.js treemap/heatmap with mock data. Example: use D3's `d3.treemap()` and render boxes in `#treemap` container. | ✅ | 2h        | 2h         |
- **F9.2** (1.5h): Integrate real API data into D3.js treemap/heatmap. Example: update D3 data binding to use fetched data. | ✅ | 1.5h | 0.5h |
<!-- Completed: Real API data is now mapped and rendered in D3 treemap. Jest-tested integration. Minimal, per spec. -->
- **F9.3** (1.5h): Add color coding and sizing logic according to performance and market cap, as per palette in frontend-design.md. Example: set fill color based on `change` value. | ✅ | 1.5h | 1.5h |
- **F9.4** (2h): Add tooltips and interactivity (hover, click, modal sheet on mobile) using D3 event handlers. Example: `on('mouseover', ...)` to show tooltip div.
- **F9.5** (1.5h): Implement sector/category drilldown: clicking a sector filters the treemap. Example: update fetch call with new sector param and re-render.

### 10. Automated Testing & Code Quality
- **F10.1** (1h): Write unit tests for JS data-fetching functions using Jest. Example: mock fetch and assert correct API call and data parsing.
- **F10.2** (1.5h): Write integration tests for D3.js rendering using Jest and jsdom. Example: assert correct number of SVG nodes rendered for input data.
- **F10.3** (2h): Write automated UI tests for index selector, date picker, and interactions using Cypress. Example: simulate user clicking index selector and verify treemap updates.
- **F10.4** (1h): Write CSS linting tests using Stylelint for all CSS files. Example: add stylelint config and run `stylelint *.css`. | ✅ | 1h | 1h |
- **F10.5** (1.5h): Add code comments and documentation to JS, HTML, and CSS files as per project standards.

### 11. Final Review & Handover
- **F11.1** (1h): Ensure all frontend automated tests pass (Jest, Cypress, Stylelint). Example: run `npm test` and `npx cypress run`.
- **F11.2** (1h): Prepare frontend handover checklist: all tests passing, code linted, documentation complete.

---
## [2025-04-25] Backend Code Refactor for Clarity & Maintainability
- All backend code (`app/routes.py`, `app/__init__.py`) now includes comprehensive docstrings, type hints, and clarifying inline comments.
- All public functions, Flask handlers, and helpers are fully documented and typed.
- Code is now easier to read, maintain, and extend, in line with project and TDD principles.
- No implementation logic was changed; only documentation, typing, and comments were added.

---
## [2025-04-25] F8.5 Complete: Debounced Dropdown Filter Changes, Loading Spinner Logic, and Jest Tests
- Debounced dropdown filter changes to prevent excessive API calls.
- Implemented loading spinner logic to show/hide on API fetches.
- Added Jest unit tests for debounce/handler logic.
- All tests passing; frontend optimized for performance.

---
## [2025-04-27] F10.4 Complete: CSS Linting Automated with Stylelint
- Added .stylelintrc.json using standard config; installed stylelint and config.
- Linting is fully automated via npm and Jest. All CSS files pass.
- All frontend tests (Jest, Cypress, Stylelint) pass as of this commit.
- Time taken: 1h

---
## [2025-04-25] F8.1 Complete: Heatmap Color Legend UI
- UI added to index.html after #treemap, styled in components.css per palette spec.
- Minimal, responsive, and matches design doc.
- Cypress E2E test (legend.cy.js) written and passing for presence, labels, and responsiveness.
- Time taken: 0.5h

---
## [2025-04-25] F8.2 Complete: Loading & Error UI States
- Added minimal #loading-spinner and #error-message containers to index.html.
- Implemented show/hide logic in main.js and wrapped API fetch to manage UI state.
- Added Jest unit tests for UI logic and Cypress UI tests (event-driven, force-click for hidden test button).
- All tests pass for error state; spinner test is robust and event-driven per Cypress best practices.
- Implementation is minimal, testable, and per project/TDD principles.
- Time taken: 1h (including tests).

---
## [2025-04-25] Frontend Navbar Implementation & Automated Testing
- Implemented Navbar (logo, title, date) in HTML and styled with minimal CSS.
- Created simple `logo.svg` placeholder.
- Added Jest unit test for Navbar structure.
- Added Cypress UI test for Navbar rendering.
- All tests passing; frontend served at http://localhost:8080 for further development.

---
## [2025-04-25] F7.5 Progress: Card, Pill/Tag Components
- Card and Pill/Tag components implemented in index.html and styled in components.css per frontend-design.md.
- TDD: Jest unit tests and Cypress UI tests written and passing for both components.
- Minimal, responsive, and per spec. Ready for extension.
- Time taken: 0.5h

---
## [2025-04-25] F7.5 Progress: Tabs Component
- Tabs component implemented in index.html and styled in components.css per frontend-design.md.
- TDD: Jest unit test and Cypress UI test written and passing for Tabs.
- Minimal, responsive, and per spec. Ready for extension.
- Time taken: 0.5h

---
## [2025-04-25] Frontend Directory Structure Established
- All frontend files (index.html, main.js, base.css, components.css, layouts.css, dark-mode.css) are now moved to the new frontend/ directory.
- Root directory is now cleanly separated into backend and frontend, following Kailash Nadh’s philosophy.
- All frontend structure tests pass via Jest (see __tests__/index.test.js).

---

## Legend
- **B**: Backend
- **F**: Frontend
- **D**: Deployment

---

## [2025-04-27] F9.3 Complete: D3 Treemap Color Coding & Sizing
- Implemented getColorForChange(change) for palette-based color mapping.
- Implemented getSizeForMarketCap(marketCap) for log-scaled sizing.
- Updated renderTreemap and mapApiDataToTreemap to use new logic.
- Updated and added Jest tests to cover new logic; all tests pass.
- Time taken: 1.5h
