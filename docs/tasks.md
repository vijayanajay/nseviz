# NSEViz Project Tasks (WBS, ≤2h per task)

All frontend work begins only after backend is fully implemented and tested.

---

## Backend (Flask API, yfinance only, single endpoint)

### 1. Project Setup & API Contract
- **B1.1**: Set up Python virtual environment and install Flask & yfinance. Example: `python -m venv venv && pip install Flask yfinance`.
- **B1.2**: Initialize Flask project structure: create folders for `app/`, `app/routes.py`, `app/__init__.py`, `requirements.txt`, and `config.py`.
- **B1.3**: Draft and document a single API contract: `/api/heatmap-data` with query params (`category`, `index`, `sector`, `date`). Document expected request format and sample response in `docs/api.md`. Example request: `/api/heatmap-data?index=NIFTY50&sector=FINANCE&date=2024-04-01`. ✅
- **B1.4**: Set up CORS in Flask using `flask-cors` to allow frontend JS access. Example: `from flask_cors import CORS; CORS(app)`.

### 2. Endpoint Stub & Mock Data
- **B2.1**: Implement `/api/heatmap-data` endpoint in `routes.py` that returns static/mock JSON data matching the documented schema. Example response: `{ "index": "NIFTY50", "sector": "FINANCE", "data": [{ "symbol": "HDFCBANK", "change": 1.2, "price": 1600.5 }] }`.
- **B2.2**: Add error handling for the endpoint: return 400 for invalid params, 500 for server errors, with JSON error messages. Example: `{ "error": "Invalid sector" }`.

### 3. yfinance Integration
- **B3.1**: Use yfinance to fetch technical chart data for requested index/sector/stock. Example: `import yfinance as yf; yf.download('^NSEI', period='1d')`.
- **B3.2**: Implement logic to filter/group yfinance data by category, index, sector as per query params. Example: filter stocks in the FINANCE sector from NIFTY50.
- **B3.3**: Transform raw yfinance data to the frontend schema: include symbol, name, price, change %, volume, etc. Example output: `[ { "symbol": "HDFCBANK", "name": "HDFC Bank", "price": 1600.5, "change": 1.2 } ]`.
- **B3.4**: Implement support for date-based data fetching (latest and historical). Example: `/api/heatmap-data?date=2024-04-01` returns data for that date.

### 4. Automated Testing & Validation
- **B4.1**: Write unit tests for `/api/heatmap-data` (mock data) using `pytest`. Example: test valid response, test invalid sector param.
- **B4.2**: Write unit tests for `/api/heatmap-data` (yfinance data) using `pytest` and `unittest.mock` to mock yfinance calls.
- **B4.3**: Implement automated API contract tests using `pytest` and `requests` to ensure endpoint returns correct schema for all query param combinations.
- **B4.4**: Add logging for requests and errors using Python's `logging` module. Log every request and error with timestamp and params.
- **B4.5**: Refactor code for clarity and maintainability: add docstrings, type hints, and inline comments. Example: `def get_heatmap_data(index: str, sector: str) -> dict:`

### 5. Documentation & Handover
- **B5.1**: Document endpoint, query params, and response schema in `docs/api.md` with request/response examples.
- **B5.2**: Prepare backend handover checklist: all tests passing (pytest), code linted (flake8), and documentation complete.

---

## Frontend (Minimal JS + D3.js, starts after backend is ready, per frontend-design.md)

### 6. Project Setup
- **F6.1**: Create static `index.html` with containers for heatmap/treemap, controls, navbar, and footer. Example: `<div id="treemap"></div> <div id="index-selector"></div>`
- **F6.2**: Create `main.js` and link to HTML. Add a script tag: `<script src="main.js"></script>`
- **F6.3**: Add CSS files: `base.css`, `components.css`, `layouts.css`, `dark-mode.css` per design system. Example: link in HTML head.

### 7. Core Components (UI Skeleton)
- **F7.1**: Implement Navbar (logo, navigation, date display) in HTML and style in `components.css`. Example: `<nav><img src="logo.svg"> <span>Indian Stock Market Heatmap</span> <span id="date"></span></nav>`
- **F7.2**: Implement Index Selector as segmented control in HTML and JS. Example: `<button data-index="NIFTY50">Nifty 50</button>`; add event listeners in JS.
- **F7.3**: Implement Date Picker with calendar overlay and focus states using vanilla JS. Example: `<input type="date" id="datepicker">` and style overlay in CSS.
- **F7.4**: Implement responsive Grid Layout for heatmap/treemap in `layouts.css`. Example: CSS grid with 12 columns for desktop, 1 column for mobile.
- **F7.5**: Implement Card, Pill/Tag, Tabs, Accordion, Ad Slot, Mobile Navigation, Snapshot Cards, Mobile Sheet Modal as per frontend-design.md, each as separate HTML/CSS components.

### 8. API Integration (with tested backend)
- **F8.1**: Implement JS fetch for `/api/heatmap-data` with query params (category, index, sector, date). Example: `fetch('/api/heatmap-data?index=NIFTY50&sector=FINANCE')` and parse JSON.
- **F8.2**: Display loading and error states in UI. Example: show spinner while loading, show error message on fetch failure.
- **F8.3**: Integrate real API data into D3.js treemap/heatmap. Example: pass fetched data to D3 layout function.

### 9. D3.js Heatmap/Treemap Visualization
- **F9.1**: Set up D3.js treemap/heatmap with mock data. Example: use D3's `d3.treemap()` and render boxes in `#treemap` container.
- **F9.2**: Integrate real API data into D3.js treemap/heatmap. Example: update D3 data binding to use fetched data.
- **F9.3**: Add color coding and sizing logic according to performance and market cap, as per palette in frontend-design.md. Example: set fill color based on `change` value.
- **F9.4**: Add tooltips and interactivity (hover, click, modal sheet on mobile) using D3 event handlers. Example: `on('mouseover', ...)` to show tooltip div.
- **F9.5**: Implement sector/category drilldown: clicking a sector filters the treemap. Example: update fetch call with new sector param and re-render.

### 10. Automated Testing & Code Quality
- **F10.1**: Write unit tests for JS data-fetching functions using Jest. Example: mock fetch and assert correct API call and data parsing.
- **F10.2**: Write integration tests for D3.js rendering using Jest and jsdom. Example: assert correct number of SVG nodes rendered for input data.
- **F10.3**: Write automated UI tests for index selector, date picker, and interactions using Cypress. Example: simulate user clicking index selector and verify treemap updates.
- **F10.4**: Write CSS linting tests using Stylelint for all CSS files. Example: add stylelint config and run `stylelint *.css`.
- **F10.5**: Add code comments and documentation to JS, HTML, and CSS files as per project standards.

### 11. Final Review & Handover
- **F11.1**: Ensure all frontend automated tests pass (Jest, Cypress, Stylelint). Example: run `npm test` and `npx cypress run`.
- **F11.2**: Prepare frontend handover checklist: all tests passing, code linted, documentation complete.

---

## Legend
- **B**: Backend
- **F**: Frontend

---

This WBS ensures a single backend endpoint, all backend work is completed and tested before frontend begins, and all frontend tasks align with your design doc. All tasks ≤2h for focused, parallelizable execution. No accessibility or manual testing tasks included. All testing is automated with specified tools.
