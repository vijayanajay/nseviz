# Development Task List: Visual Market Pulse Dashboard (Frontend)

## Phase 0: Setup & Foundation (Prerequisites for MVP)

---

#### TASK-001: Project Initialization & Structure
*   **Task ID:** TASK-001
*   **Task Title:** Project Initialization & Structure
*   **Description:** Set up the Git repository, initialize the frontend project structure, and basic build tooling.
*   **PRD Reference(s):** Section 6 (Technical Architecture), NFR-04
*   **Acceptance Criteria (AC):**
    *   1. Git repository created and accessible.
    *   2. Basic project folder structure (`index.html`, `css/`, `js/`) exists.
    *   3. Project can be cloned and run locally (open `index.html` or via local server).
    *   4. README.md created with initial project description [Ref: P12].
*   **Dependencies:** None
*   **Relevant Principle(s):** P1, P12
*   **Estimated Effort:** 5h
*   **Priority:** Highest
*   **Type:** Chore
    *   **Subtask 1:** Create Git repository and push to remote (1h)
    *   **Subtask 2:** Initialize project folder structure (index.html, css/, js/) (1h)
    *   **Subtask 3:** Set up simple local dev server (npm/yarn or Python http.server) (1h)
    *   **Subtask 4:** Create initial README.md (1h)
    *   **Subtask 5:** Add .gitignore and basic config files (1h)

---

#### TASK-002: Core Tooling & Quality Setup
*   **Task ID:** TASK-002
*   **Task Title:** Core Tooling & Quality Setup
*   **Description:** Integrate Bootstrap, configure linting, formatting, and automated testing.
*   **PRD Reference(s):** Section 6, NFR-04
*   **Acceptance Criteria (AC):**
    *   1. Bootstrap 5 CSS/JS included and functional.
    *   2. ESLint, Stylelint, Prettier configured and passing on initial files.
    *   3. Testing framework (Jest/Vitest) and E2E (Cypress/Playwright) set up with sample tests.
    *   4. Tooling/scripts documented in README.md.
*   **Dependencies:** TASK-001
*   **Relevant Principle(s):** P4, P5, P12
*   **Estimated Effort:** 10h
*   **Priority:** Highest
*   **Type:** Chore
    *   **Subtask 1:** Add Bootstrap 5 via CDN or npm, verify layout (1h)
    *   **Subtask 2:** Add Bootstrap JS/Popper.js, verify dropdowns (1h)
    *   **Subtask 3:** Configure ESLint (2h)
    *   **Subtask 4:** Configure Stylelint (2h)
    *   **Subtask 5:** Configure Prettier (1h)
    *   **Subtask 6:** Add npm/yarn scripts for lint/format/test (1h)
    *   **Subtask 7:** Set up Jest/Vitest with sample unit test (1h)
    *   **Subtask 8:** Set up Cypress/Playwright with sample E2E test (1h)

---

#### TASK-003: Library Integrations
*   **Task ID:** TASK-003
*   **Task Title:** Library Integrations
*   **Description:** Integrate HTMX, Alpine.js, and select/integrate charting library.
*   **PRD Reference(s):** Section 6, FEAT-004
*   **Acceptance Criteria (AC):**
    *   1. HTMX and Alpine.js included and verified with test elements.
    *   2. Charting library selected, rationale documented, and sample chart renders.
    *   3. Integration methods documented in README.md.
*   **Dependencies:** TASK-001
*   **Relevant Principle(s):** P5, P12
*   **Estimated Effort:** 9h
*   **Priority:** High
*   **Type:** Chore
    *   **Subtask 1:** Add HTMX via CDN/npm, verify hx-get (1h)
    *   **Subtask 2:** Add Alpine.js via CDN/npm, verify x-data/x-show (1h)
    *   **Subtask 3:** Evaluate/select charting library (2h)
    *   **Subtask 4:** Integrate charting library, render sample chart (2h)
    *   **Subtask 5:** Document integrations in README.md (1h)
    *   **Subtask 6:** Add sample test for each library (2h)

---

#### TASK-004: Environment Configuration
*   **Task ID:** TASK-004
*   **Task Title:** Environment Configuration
*   **Description:** Implement environment-specific config (API base URL, etc.) for dev/prod.
*   **PRD Reference(s):** NFR-04, P8, P9
*   **Acceptance Criteria (AC):**
    *   1. API base URL/config not hardcoded, supports dev/prod.
    *   2. Config process documented in README.md.
*   **Dependencies:** TASK-001
*   **Relevant Principle(s):** P8, P9, P12
*   **Estimated Effort:** 5h
*   **Priority:** High
*   **Type:** Chore
    *   **Subtask 1:** Implement config.js or env var mechanism (2h)
    *   **Subtask 2:** Ensure API base URL is configurable (1h)
    *   **Subtask 3:** Support dev/prod config switching (1h)
    *   **Subtask 4:** Document config in README.md (1h)

---

## Phase 1: MVP (Release 1)

---

#### TASK-010: API Integration - Fetch Nifty 50 Stock List & Daily Data
*   **Task ID:** TASK-010
*   **Task Title:** API Integration - Fetch Nifty 50 Stock List & Daily Data
*   **Description:** Implement JavaScript logic to fetch the list of Nifty 50 stocks and their required daily data (% change, volume change, name) from the backend Flask API upon homepage load. Handle loading and error states.
*   **PRD Reference(s):** FEAT-001, FR-1.1, FR-1.4, NFR-01, NFR-06, NFR-08
*   **Acceptance Criteria (AC):**
    *   1. JS function makes a GET request to the defined backend API endpoint for Nifty 50 data.
    *   2. Request uses HTTPS [Ref: P6].
    *   3. API base URL is sourced from configuration [Ref: P8].
    *   4. Loading state is visually indicated while data is fetched (e.g., Bootstrap spinner) [Ref: P7].
    *   5. Successful response data (list of stocks with % change, volume change, name) is processed.
    *   6. API errors (network error, non-2xx response) are caught, and a user-friendly error message is displayed (e.g., Bootstrap alert) [Ref: P7].
    *   7. Data source attribution (Yahoo Finance) displayed if required by API contract [Ref: NFR-08].
    *   8. Unit tests cover success, error, and loading states [Ref: P4].
*   **Dependencies:** TASK-004, Backend API Endpoint Ready [Ref: P3, P13]
*   **Relevant Principle(s):** P1, P3, P4, P6, P7, P8
*   **Estimated Effort:** 8.5h
*   **Priority:** High
*   **Type:** Feature (API Integration)
    *   **Subtask 1:** Implement JS function to make a GET request to the backend API (2h)
    *   **Subtask 2:** Ensure request uses HTTPS (0.5h)
    *   **Subtask 3:** Source API base URL from configuration (0.5h)
    *   **Subtask 4:** Visually indicate loading state (1h)
    *   **Subtask 5:** Process successful response data (1h)
    *   **Subtask 6:** Handle API errors gracefully (1h)
    *   **Subtask 7:** Display data source attribution (0.5h)
    *   **Subtask 8:** Write unit tests (2h)

---

#### TASK-011: Frontend Component - Render Nifty 50 Heatmap Tiles
*   **Task ID:** TASK-011
*   **Task Title:** Frontend Component - Render Nifty 50 Heatmap Tiles
*   **Description:** Using the data fetched in TASK-010, dynamically generate the HTML for the Nifty 50 heatmap grid. Each stock should be represented as a tile (e.g., Bootstrap card or custom div) within the Bootstrap grid structure.
*   **PRD Reference(s):** FEAT-001, FR-1.1, FR-1.3, NFR-04, NFR-05
*   **Acceptance Criteria (AC):**
    *   1. JS logic iterates through the fetched Nifty 50 stock data.
    *   2. For each stock, an HTML tile element is created and appended to the designated heatmap container.
    *   3. Tiles are structured using Bootstrap grid columns for responsiveness [Ref: P5, P10].
    *   4. Each tile contains necessary data attributes (e.g., `data-symbol`) for later interactions.
    *   5. Code is well-structured and follows linting rules [Ref: P4, P12].
    *   6. Unit tests verify correct generation of tile structure based on sample data [Ref: P4].
*   **Dependencies:** TASK-010
*   **Relevant Principle(s):** P1, P4, P5, P10, P12
*   **Estimated Effort:** 6h
*   **Priority:** High
*   **Type:** Feature (Component)
    *   **Subtask 1:** Implement JS logic to iterate through the fetched Nifty 50 stock data (1h)
    *   **Subtask 2:** Create an HTML tile element for each stock (1h)
    *   **Subtask 3:** Append tiles to the designated heatmap container (0.5h)
    *   **Subtask 4:** Structure tiles using Bootstrap grid columns (0.5h)
    *   **Subtask 5:** Add necessary data attributes to each tile (0.5h)
    *   **Subtask 6:** Ensure code is well-structured and follows linting rules (0.5h)
    *   **Subtask 7:** Write unit tests (2h)

---

#### TASK-012: Styling - Apply Heatmap Tile Colors
*   **Task ID:** TASK-012
*   **Task Title:** Styling - Apply Heatmap Tile Colors
*   **Description:** Implement CSS (using Bootstrap utilities/variables or minimal custom CSS) to color the background of each heatmap tile based on the stock's daily percentage change. Define the red/green color scale and intensity mapping.
*   **PRD Reference(s):** FEAT-011, FR-1.4, FR-11.1, FR-11.2, FR-11.3, FR-11.4, NFR-02
*   **Acceptance Criteria (AC):**
    *   1. CSS rules or JS logic correctly applies background colors to tiles based on % change data.
    *   2. Positive changes use shades of green [Ref: P1, P11].
    *   3. Negative changes use shades of red [Ref: P1, P11].
    *   4. Neutral change uses a distinct neutral color [Ref: P1, P11].
    *   5. Color intensity visually correlates with the magnitude of change (specific mapping defined and implemented) [Ref: P1, P11].
    *   6. Color variables defined using CSS variables for maintainability [Ref: NFR-04, P5].
    *   7. Ensure text on tiles has sufficient contrast against all background shades (WCAG AA) [Ref: P11].
*   **Dependencies:** TASK-011, Finalized Color Palette [Ref: D2]
*   **Relevant Principle(s):** P1, P5, P11, P12
*   **Estimated Effort:** 6.5h
*   **Priority:** High
*   **Type:** Feature (Styling)
    *   **Subtask 1:** Implement CSS rules or JS logic to apply background colors to tiles (2h)
    *   **Subtask 2:** Ensure positive changes use shades of green (0.5h)
    *   **Subtask 3:** Ensure negative changes use shades of red (0.5h)
    *   **Subtask 4:** Ensure neutral change uses a distinct neutral color (0.5h)
    *   **Subtask 5:** Implement color intensity mapping (1h)
    *   **Subtask 6:** Define color variables using CSS variables (1h)
    *   **Subtask 7:** Ensure text on tiles has sufficient contrast (1h)

---

#### TASK-013: Interaction - Heatmap Tile Click Navigation
*   **Task ID:** TASK-013
*   **Task Title:** Interaction - Heatmap Tile Click Navigation
*   **Description:** Implement the click/tap interaction on heatmap tiles. Clicking a tile should navigate the user to the Stock Detail Page for that specific stock (URL structure to be defined, e.g., `/stock/{ticker}`).
*   **PRD Reference(s):** FEAT-001, FR-1.5
*   **Acceptance Criteria (AC):**
    *   1. Event listeners are attached to heatmap tiles.
    *   2. Clicking/tapping a tile triggers navigation.
    *   3. Navigation passes the stock identifier (e.g., ticker symbol) to the next page/route.
    *   4. Interaction works on both desktop (click) and mobile (tap) [Ref: P10].
    *   5. Unit/Integration tests verify navigation trigger on click [Ref: P4].
*   **Dependencies:** TASK-011, TASK-015
*   **Relevant Principle(s):** P1, P4, P5, P10
*   **Estimated Effort:** 4h
*   **Priority:** High
*   **Type:** Feature (Interaction)
    *   **Subtask 1:** Attach event listeners to heatmap tiles (1h)
    *   **Subtask 2:** Implement navigation on tile click/tap (1h)
    *   **Subtask 3:** Pass the stock identifier to the next page/route (0.5h)
    *   **Subtask 4:** Ensure interaction works on both desktop and mobile (0.5h)
    *   **Subtask 5:** Write unit/integration tests (1h)

---

#### TASK-014: Interaction - Stock Tile Tooltip (HTMX)
*   **Task ID:** TASK-014
*   **Task Title:** Interaction - Stock Tile Tooltip (HTMX)
*   **Description:** Implement the tooltip display on heatmap tile hover (desktop) or tap-hold (mobile) using HTMX. The tooltip content (Stock Name, % Change, Volume Change) should be fetched dynamically from a dedicated backend endpoint returning an HTML fragment.
*   **PRD Reference(s):** FEAT-002, FR-2.1, FR-2.2, FR-2.3, FR-2.4, NFR-01, NFR-06
*   **Acceptance Criteria (AC):**
    *   1. HTMX attributes (`hx-get`, `hx-trigger`) added to heatmap tiles to fetch tooltip content.
    *   2. Backend endpoint exists and returns HTML fragment with required data [Ref: P3, P13].
    *   3. Tooltip appears on hover (desktop) / tap-hold (mobile) within 200ms [Ref: NFR-01].
    *   4. Tooltip displays Stock Name, Daily % Change, Daily Volume Change.
    *   5. Tooltip disappears on mouse-out / tap release.
    *   6. HTMX request uses HTTPS and follows security best practices [Ref: P5, P6].
    *   7. Loading state handled if API call is slow [Ref: P7].
    *   8. Error state handled if API call fails [Ref: P7].
    *   9. Tooltip styling is consistent with the UI (potentially using Bootstrap popovers/tooltips triggered by HTMX) [Ref: P5].
    *   10. E2E tests verify tooltip appearance, content, and disappearance [Ref: P4].
*   **Dependencies:** TASK-011, TASK-003, Backend API Endpoint Ready [Ref: P3, P13]
*   **Relevant Principle(s):** P1, P3, P4, P5, P6, P7, P10
*   **Estimated Effort:** 7h
*   **Priority:** High
*   **Type:** Feature (Interaction/API)
    *   **Subtask 1:** Add HTMX attributes to heatmap tiles to fetch tooltip content (1h)
    *   **Subtask 2:** Ensure backend endpoint exists and returns HTML fragment (0h - Backend Task)
    *   **Subtask 3:** Ensure tooltip appears on hover/tap-hold within 200ms (1h)
    *   **Subtask 4:** Ensure tooltip displays Stock Name, Daily % Change, Daily Volume Change (0.5h)
    *   **Subtask 5:** Ensure tooltip disappears on mouse-out/tap release (0.5h)
    *   **Subtask 6:** Ensure HTMX request uses HTTPS and follows security best practices (0.5h)
    *   **Subtask 7:** Handle loading state (0.5h)
    *   **Subtask 8:** Handle error state (0.5h)
    *   **Subtask 9:** Ensure tooltip styling is consistent with the UI (0.5h)
    *   **Subtask 10:** Write E2E tests (2h)

---

#### TASK-015: Define Core Layout Structure (Stock Detail Page)

*   **Task ID:** TASK-015
*   **Task Title:** Define Core Layout Structure (Stock Detail Page)
*   **Description:** Create the HTML structure for the Stock Detail page using Bootstrap's grid system. Define areas for Stock Header Info, Chart, Timeframe Selector, and Key Metrics.
*   **PRD Reference(s):** FEAT-003, FR-3.1 to FR-3.6, Section 6
*   **Acceptance Criteria (AC):**
    *   1. Separate HTML file or route handler created for the stock detail view.
    *   2. Bootstrap grid (`container`, `row`, `col-*`) used for layout [Ref: P5, P10].
    *   3. Placeholders exist for Header, Chart, Timeframe Selector, Metrics sections.
    *   4. Layout adapts reasonably across Bootstrap breakpoints [Ref: P10].
    *   5. Basic accessibility structure (landmarks) is present [Ref: P11].
*   **Dependencies:** TASK-002
*   **Relevant Principle(s):** P1, P5, P10, P11, P12
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** High
*   **Type:** Feature (Layout)

---

#### TASK-016: API Integration - Fetch Stock Detail Data (MVP)

*   **Task ID:** TASK-016
*   **Task Title:** API Integration - Fetch Stock Detail Data (MVP)
*   **Description:** Implement JS logic for the Stock Detail page to fetch essential data (Full Name, Ticker, Current Price, Change, MCap, Day H/L, Volume, 1D Price History) from the backend API based on the stock ticker passed in the URL/route. Handle loading/error states.
*   **PRD Reference(s):** FEAT-003, FR-3.1, FR-3.2, FEAT-004 (Data), FEAT-006 (Data), NFR-01, NFR-06, NFR-08
*   **Acceptance Criteria (AC):**
    *   1. JS extracts stock ticker from URL/route parameter.
    *   2. GET request made to the defined backend API endpoint for stock details.
    *   3. Request uses HTTPS [Ref: P6].
    *   4. API base URL sourced from configuration [Ref: P8].
    *   5. Loading state visually indicated [Ref: P7].
    *   6. Successful response data processed.
    *   7. API errors handled gracefully with user message [Ref: P7].
    *   8. Data source attribution displayed if required [Ref: NFR-08].
    *   9. Unit tests cover success, error, and loading states [Ref: P4].
*   **Dependencies:** TASK-015, TASK-004, Backend API Endpoint Ready [Ref: P3, P13]
*   **Relevant Principle(s):** P1, P3, P4, P6, P7, P8
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** High
*   **Type:** Feature (API Integration)

---

#### TASK-017: Frontend Component - Display Stock Header Info

*   **Task ID:** TASK-017
*   **Task Title:** Frontend Component - Display Stock Header Info
*   **Description:** On the Stock Detail page, display the fetched Stock Name, Ticker Symbol, Current Price, Absolute Change, and Percentage Change. Apply appropriate red/green color coding using Bootstrap utilities or custom CSS.
*   **PRD Reference(s):** FEAT-003, FR-3.1, FR-3.2, FEAT-011
*   **Acceptance Criteria (AC):**
    *   1. Data fetched in TASK-016 is displayed in the designated header area.
    *   2. Stock Name and Ticker are prominent.
    *   3. Price, Absolute Change, % Change are clearly displayed.
    *   4. Red/green color coding applied correctly based on change value [Ref: P1, P11].
    *   5. Text contrast meets WCAG AA [Ref: P11].
    *   6. Unit tests verify correct display and coloring based on sample data [Ref: P4].
*   **Dependencies:** TASK-016
*   **Relevant Principle(s):** P1, P4, P5, P11
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** High
*   **Type:** Feature (Component)

---

#### TASK-018: Frontend Component - Render 1D Stock Price Chart (Line)

*   **Task ID:** TASK-018
*   **Task Title:** Frontend Component - Render 1D Stock Price Chart (Line)
*   **Description:** Using the 1D price history data fetched in TASK-016 and the integrated charting library, render a line chart on the Stock Detail page. Ensure axes are labeled correctly.
*   **PRD Reference(s):** FEAT-004, FR-4.1, FR-4.2 (MVP), FR-4.4 (MVP), FR-4.5, FR-4.6, NFR-01
*   **Acceptance Criteria (AC):**
    *   1. Chart library API used to create a line chart instance.
    *   2. 1D price history data is correctly formatted and passed to the chart.
    *   3. Chart renders in the designated area within 1 second [Ref: NFR-01].
    *   4. Time axis (X) and Price axis (Y) are clearly labeled.
    *   5. Chart uses appropriate granularity (e.g., intraday points).
    *   6. Chart styling aligns with overall UI theme [Ref: P1, P5].
    *   7. Unit tests verify chart configuration and data passing [Ref: P4].
*   **Dependencies:** TASK-016, TASK-003
*   **Relevant Principle(s):** P1, P4, P5
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** High
*   **Type:** Feature (Component/Charting)

---

#### TASK-019: Frontend Component - Display Chart Timeframe Selector (MVP State)

*   **Task ID:** TASK-019
*   **Task Title:** Frontend Component - Display Chart Timeframe Selector (MVP State)
*   **Description:** Display the timeframe selection controls (e.g., Bootstrap buttons or button group) labeled "1D", "5D", "1M", "6M", "1Y", "Max". For MVP, only the "1D" button should appear active/selected, and clicking others has no effect yet. Use Alpine.js for managing the active state visually.
*   **PRD Reference(s):** FEAT-005, FR-5.1, FR-5.2, FR-5.4 (MVP)
*   **Acceptance Criteria (AC):**
    *   1. Buttons/tabs for all timeframes (1D-Max) are displayed using Bootstrap components [Ref: P5].
    *   2. The "1D" button is visually highlighted as active by default (using Alpine.js `x-data` and conditional classes) [Ref: P5].
    *   3. Other buttons are visually inactive.
    *   4. Clicking buttons (other than 1D) does not trigger chart updates in MVP.
    *   5. Unit tests verify initial state and button rendering [Ref: P4].
*   **Dependencies:** TASK-015, TASK-003
*   **Relevant Principle(s):** P1, P4, P5
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** High
*   **Type:** Feature (Component/Interaction)

---

#### TASK-020: Frontend Component - Display Key Stock Metrics (MVP)

*   **Task ID:** TASK-020
*   **Task Title:** Frontend Component - Display Key Stock Metrics (MVP)
*   **Description:** Display the basic key metrics (Market Cap, Day's High, Day's Low, Volume) fetched in TASK-016. Use Bootstrap cards or lists for a clear visual presentation.
*   **PRD Reference(s):** FEAT-006, FR-6.1, FR-6.3
*   **Acceptance Criteria (AC):**
    *   1. Market Cap, Day's High, Day's Low, Volume data displayed in the designated metrics area.
    *   2. Bootstrap components (e.g., cards, list groups) used for layout [Ref: P5].
    *   3. Metrics are clearly labeled.
    *   4. Presentation avoids dense text blocks [Ref: NFR-02].
    *   5. Unit tests verify correct display of metric data [Ref: P4].
*   **Dependencies:** TASK-016
*   **Relevant Principle(s):** P1, P4, P5
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** High
*   **Type:** Feature (Component)

---

#### TASK-021: Navigation - Implement Back Functionality (MVP - Browser Back)

*   **Task ID:** TASK-021
*   **Task Title:** Navigation - Implement Back Functionality (MVP - Browser Back)
*   **Description:** Ensure users can navigate back from the Stock Detail page to the Homepage using the browser's native back button. (No explicit UI element needed for MVP).
*   **PRD Reference(s):** FEAT-003, FR-3.6, FEAT-012, FR-12.1
*   **Acceptance Criteria (AC):**
    *   1. Navigating from Homepage -> Stock Detail Page updates the browser history.
    *   2. Clicking the browser's back button on the Stock Detail page returns the user to the previous view (Homepage).
    *   3. E2E test verifies this navigation flow [Ref: P4].
*   **Dependencies:** TASK-013
*   **Relevant Principle(s):** P1, P4
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** High
*   **Type:** Feature (Navigation)

---

#### TASK-022: Testing & Verification - Responsive Layouts (MVP Features)

*   **Task ID:** TASK-022
*   **Task Title:** Testing & Verification - Responsive Layouts (MVP Features)
*   **Description:** Manually test and verify that all MVP features (Homepage Heatmap, Stock Detail Page) render correctly and are usable across Bootstrap's standard breakpoints (mobile, tablet, desktop). Fix any layout issues using Bootstrap utilities.
*   **PRD Reference(s):** FEAT-010, FR-10.1, FR-10.2, FR-10.3
*   **Acceptance Criteria (AC):**
    *   1. Homepage heatmap displays correctly on xs, sm, md, lg, xl, xxl breakpoints [Ref: P10].
    *   2. Stock Detail Page layout (header, chart placeholder, metrics) displays correctly across breakpoints [Ref: P10].
    *   3. Click/tap targets (tiles) are usable on touch devices [Ref: P10].
    *   4. HTMX Tooltip interaction works on touch (tap-hold) and non-touch (hover) [Ref: P10].
    *   5. No horizontal scrolling occurs on any standard breakpoint.
    *   6. Verification checklist completed and signed off.
*   **Dependencies:** All MVP Feature Tasks (TASK-010 to TASK-021)
*   **Relevant Principle(s):** P1, P4, P10
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** High
*   **Type:** Testing

---

#### TASK-023: Review & Verification - Consistent Color Coding (MVP Features)

*   **Task ID:** TASK-023
*   **Task Title:** Review & Verification - Consistent Color Coding (MVP Features)
*   **Description:** Review all MVP components (Heatmap, Stock Header) to ensure the red/green color coding for positive/negative changes is implemented consistently and adheres to the defined intensity mapping. Check text contrast.
*   **PRD Reference(s):** FEAT-011, FR-1.4, FR-3.2, FR-11.1, FR-11.2, FR-11.3, NFR-02, NFR-07
*   **Acceptance Criteria (AC):**
    *   1. Heatmap tiles use consistent red/green shades based on % change [Ref: P11].
    *   2. Stock Detail header uses the same red/green convention for price change [Ref: P11].
    *   3. Color intensity mapping is applied consistently where applicable [Ref: P11].
    *   4. Text contrast on colored backgrounds meets WCAG AA [Ref: P11].
    *   5. Review checklist completed.
*   **Dependencies:** TASK-012, TASK-017
*   **Relevant Principle(s):** P1, P11
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** High
*   **Type:** Testing/Review

---

## Phase 2: Release 2

---

#### TASK-024: API Integration - Fetch Nifty Next 50 Data

*   **Task ID:** TASK-024
*   **Task Title:** API Integration - Fetch Nifty Next 50 Data
*   **Description:** Implement logic to fetch Nifty Next 50 stock data (similar to TASK-010) from the backend API.
*   **PRD Reference(s):** FEAT-001 (Expansion), FR-1.2, NFR-01, NFR-06, NFR-08
*   **Acceptance Criteria (AC):**
    *   1. JS function makes GET request to the defined backend API endpoint for Nifty Next 50 data.
    *   2. Request uses HTTPS [Ref: P6].
    *   3. Loading state handled [Ref: P7].
    *   4. Error state handled [Ref: P7].
    *   5. Successful response data processed.
    *   6. Unit tests cover success, error, loading states [Ref: P4].
*   **Dependencies:** TASK-004, Backend API Endpoint Ready [Ref: P3, P13]
*   **Relevant Principle(s):** P1, P3, P4, P6, P7, P8
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Medium
*   **Type:** Feature (API Integration)

---

#### TASK-025: Frontend Component - Integrate Nifty Next 50 into Homepage Heatmap

*   **Task ID:** TASK-025
*   **Task Title:** Frontend Component - Integrate Nifty Next 50 into Homepage Heatmap
*   **Description:** Update the homepage to display the Nifty Next 50 heatmap alongside or switchable with the Nifty 50 heatmap. Reuse tile rendering (TASK-011) and styling (TASK-012) logic.
*   **PRD Reference(s):** FEAT-001 (Expansion), FR-1.2
*   **Acceptance Criteria (AC):**
    *   1. Homepage layout updated to accommodate Nifty Next 50 heatmap (e.g., separate section, tabs).
    *   2. Nifty Next 50 data (from TASK-024) is used to render tiles.
    *   3. Tile rendering, coloring, click navigation, and tooltips function correctly for Nifty Next 50 stocks.
    *   4. Responsiveness maintained across breakpoints [Ref: P10].
    *   5. Unit/Integration tests verify display of both heatmaps [Ref: P4].
*   **Dependencies:** TASK-024, TASK-011, TASK-012, TASK-013, TASK-014
*   **Relevant Principle(s):** P1, P4, P5, P10, P11
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Medium
*   **Type:** Feature (Component)

---

#### TASK-026: API Integration - Fetch Historical Stock Data (5D-Max)

*   **Task ID:** TASK-026
*   **Task Title:** API Integration - Fetch Historical Stock Data (5D-Max)
*   **Description:** Implement logic to fetch historical stock price data for different timeframes (5D, 1M, 6M, 1Y, Max) from the backend API, likely triggered on demand when a timeframe button is clicked.
*   **PRD Reference(s):** FEAT-005 (Full), NFR-01, NFR-06, NFR-08
*   **Acceptance Criteria (AC):**
    *   1. JS function makes GET requests to the backend API for historical data, passing stock ticker and timeframe.
    *   2. Requests use HTTPS [Ref: P6].
    *   3. Loading state handled while fetching [Ref: P7].
    *   4. Error state handled [Ref: P7].
    *   5. Successful response data processed.
    *   6. Unit tests cover API call logic [Ref: P4].
*   **Dependencies:** TASK-004, Backend API Endpoint Ready [Ref: P3, P13]
*   **Relevant Principle(s):** P1, P3, P4, P6, P7, P8
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Medium
*   **Type:** Feature (API Integration)

---

#### TASK-027: Interaction - Implement Chart Timeframe Selection Logic

*   **Task ID:** TASK-027
*   **Task Title:** Interaction - Implement Chart Timeframe Selection Logic
*   **Description:** Enhance the timeframe selector (TASK-019). Clicking a timeframe button (5D-Max) should trigger fetching the corresponding historical data (TASK-026) and update the stock chart (TASK-018) to display the new data. Use Alpine.js to manage the active button state and potentially HTMX to fetch/update the chart data/container.
*   **PRD Reference(s):** FEAT-005 (Full), FR-5.3, FR-5.4, FR-5.5, NFR-01
*   **Acceptance Criteria (AC):**
    *   1. Clicking timeframe buttons (5D-Max) triggers data fetch (TASK-026).
    *   2. Chart updates within 1 second of receiving new data [Ref: NFR-01].
    *   3. The clicked button becomes visually active, and the previously active button becomes inactive (using Alpine.js) [Ref: P5].
    *   4. Chart correctly displays data for the selected timeframe (5D, 1M, 6M, 1Y, Max).
    *   5. Loading state shown on chart during update [Ref: P7].
    *   6. Error state handled if data fetch fails [Ref: P7].
    *   7. Integration tests verify button clicks, data fetch trigger, active state change, and chart update [Ref: P4].
*   **Dependencies:** TASK-019, TASK-018, TASK-026, TASK-003
*   **Relevant Principle(s):** P1, P4, P5, P7
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Medium
*   **Type:** Feature (Interaction/Charting)

---

#### TASK-028: API Integration - Fetch Additional Stock Metrics

*   **Task ID:** TASK-028
*   **Task Title:** API Integration - Fetch Additional Stock Metrics
*   **Description:** Update the stock detail API call (or add a new one) to fetch the remaining metrics (P/E Ratio, 52-Week High, 52-Week Low).
*   **PRD Reference(s):** FEAT-006 (Full), FR-6.2
*   **Acceptance Criteria (AC):**
    *   1. API call fetches P/E Ratio, 52W High, 52W Low data.
    *   2. Data is available to the frontend component.
    *   3. Loading/error states handled appropriately [Ref: P7].
    *   4. Unit tests verify data fetching [Ref: P4].
*   **Dependencies:** TASK-016 (or modification of it), Backend API Endpoint Ready [Ref: P3, P13]
*   **Relevant Principle(s):** P1, P3, P4, P6, P7
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Medium
*   **Type:** Feature (API Integration)

---

#### TASK-029: Frontend Component - Display Additional Stock Metrics

*   **Task ID:** TASK-029
*   **Task Title:** Frontend Component - Display Additional Stock Metrics
*   **Description:** Update the Key Stock Metrics component (TASK-020) to display the newly fetched metrics (P/E, 52W H/L) alongside the basic ones.
*   **PRD Reference(s):** FEAT-006 (Full), FR-6.2, FR-6.3
*   **Acceptance Criteria (AC):**
    *   1. P/E Ratio, 52W High, 52W Low displayed in the metrics section.
    *   2. Layout remains clean and uses Bootstrap components [Ref: P5].
    *   3. Metrics are clearly labeled.
    *   4. Unit tests verify display of all metrics [Ref: P4].
*   **Dependencies:** TASK-028, TASK-020
*   **Relevant Principle(s):** P1, P4, P5
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Medium
*   **Type:** Feature (Component)

---

#### TASK-030: Define Core Layout Structure (Index Detail Page)

*   **Task ID:** TASK-030
*   **Task Title:** Define Core Layout Structure (Index Detail Page)
*   **Description:** Create the HTML structure for the Index Detail page (e.g., for Nifty 50) using Bootstrap. Define areas for Index Name, Focused Heatmap, Intraday Chart, and (future) Gainers/Losers.
*   **PRD Reference(s):** FEAT-007, FR-7.1 to FR-7.5, Section 6
*   **Acceptance Criteria (AC):**
    *   1. Separate HTML file or route handler created for the index detail view.
    *   2. Bootstrap grid used for layout [Ref: P5, P10].
    *   3. Placeholders exist for Index Name, Heatmap, Chart, Gainers/Losers sections.
    *   4. Layout adapts reasonably across Bootstrap breakpoints [Ref: P10].
    *   5. Basic accessibility structure present [Ref: P11].
*   **Dependencies:** TASK-002
*   **Relevant Principle(s):** P1, P5, P10, P11, P12
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Medium
*   **Type:** Feature (Layout)

---

#### TASK-031: API Integration - Fetch Index Detail Data

*   **Task ID:** TASK-031
*   **Task Title:** API Integration - Fetch Index Detail Data
*   **Description:** Implement logic to fetch data for a specific index (e.g., Nifty 50 constituents with daily data, index intraday price history) from the backend API.
*   **PRD Reference(s):** FEAT-007, FEAT-008 (Data), NFR-01, NFR-06, NFR-08
*   **Acceptance Criteria (AC):**
    *   1. JS extracts index identifier from URL/route.
    *   2. GET request made to the backend API for index details.
    *   3. Request uses HTTPS [Ref: P6].
    *   4. Loading/error states handled [Ref: P7].
    *   5. Successful response data (constituent list, intraday history) processed.
    *   6. Unit tests cover API logic [Ref: P4].
*   **Dependencies:** TASK-030, TASK-004, Backend API Endpoint Ready [Ref: P3, P13]
*   **Relevant Principle(s):** P1, P3, P4, P6, P7, P8
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Medium
*   **Type:** Feature (API Integration)

---

#### TASK-032: Frontend Component - Display Index Detail Header & Focused Heatmap

*   **Task ID:** TASK-032
*   **Task Title:** Frontend Component - Display Index Detail Header & Focused Heatmap
*   **Description:** On the Index Detail page, display the Index Name prominently. Render a heatmap containing only the stocks belonging to that index, using the fetched constituent data. Reuse heatmap tile logic (TASK-011, TASK-012, TASK-013, TASK-014).
*   **PRD Reference(s):** FEAT-007, FR-7.1, FR-7.2
*   **Acceptance Criteria (AC):**
    *   1. Index Name displayed clearly.
    *   2. Focused heatmap rendered using fetched constituent data.
    *   3. Heatmap tiles use correct coloring, tooltips, and click navigation to Stock Detail pages.
    *   4. Component reuses existing heatmap logic effectively [Ref: NFR-04].
    *   5. Unit/Integration tests verify header and heatmap display [Ref: P4].
*   **Dependencies:** TASK-031, TASK-011, TASK-012, TASK-013, TASK-014
*   **Relevant Principle(s):** P1, P4, P5, P10, P11, P12
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Medium
*   **Type:** Feature (Component)

---

#### TASK-033: Frontend Component - Render Intraday Index Chart

*   **Task ID:** TASK-033
*   **Task Title:** Frontend Component - Render Intraday Index Chart
*   **Description:** Using the fetched index intraday price history (TASK-031) and the charting library, render a simple line or area chart on the Index Detail page.
*   **PRD Reference(s):** FEAT-008, FR-8.1, FR-8.2, FR-8.3, NFR-01
*   **Acceptance Criteria (AC):**
    *   1. Chart library API used to create a line/area chart.
    *   2. Index intraday data passed correctly to the chart.
    *   3. Chart renders within 1 second [Ref: NFR-01].
    *   4. Time and Index Level axes are labeled.
    *   5. Chart uses appropriate coloring (e.g., based on overall day change) [Ref: P1, P11].
    *   6. Unit tests verify chart configuration and data passing [Ref: P4].
*   **Dependencies:** TASK-031, TASK-003
*   **Relevant Principle(s):** P1, P4, P5, P11
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Medium
*   **Type:** Feature (Component/Charting)

---

#### TASK-034: Navigation - Implement Explicit Back Button / Breadcrumbs

*   **Task ID:** TASK-034
*   **Task Title:** Navigation - Implement Explicit Back Button / Breadcrumbs
*   **Description:** Replace/augment the reliance on the browser back button (TASK-021) with a clear UI element (e.g., a "Back" arrow button using Bootstrap icons/buttons, or a breadcrumb trail) on Detail pages (Stock, Index).
*   **PRD Reference(s):** FEAT-012 (Full), FR-12.2
*   **Acceptance Criteria (AC):**
    *   1. A visible "Back" button or breadcrumb trail is present on Stock Detail and Index Detail pages.
    *   2. Clicking the Back button/link navigates to the logically previous page (e.g., Index Detail -> Homepage, Stock Detail -> Index Detail or Homepage).
    *   3. Implementation uses Bootstrap components/utilities where possible [Ref: P5].
    *   4. Navigation logic is robust.
    *   5. E2E tests verify navigation using the UI element [Ref: P4].
*   **Dependencies:** TASK-015, TASK-030
*   **Relevant Principle(s):** P1, P4, P5, P12
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Medium
*   **Type:** Feature (Navigation)

---

## Phase 3: Release 3

---

#### TASK-035: API Integration - Fetch Top Gainers/Losers Data

*   **Task ID:** TASK-035
*   **Task Title:** API Integration - Fetch Top Gainers/Losers Data
*   **Description:** Implement logic to fetch the top 3-5 gaining and losing stocks (symbol, % change) for a specific index from the backend API.
*   **PRD Reference(s):** FEAT-009 (Data)
*   **Acceptance Criteria (AC):**
    *   1. JS function makes GET request to the backend API for gainers/losers, passing index identifier.
    *   2. Request uses HTTPS [Ref: P6].
    *   3. Loading/error states handled [Ref: P7].
    *   4. Successful response data processed.
    *   5. Unit tests cover API logic [Ref: P4].
*   **Dependencies:** TASK-030, TASK-004, Backend API Endpoint Ready [Ref: P3, P13]
*   **Relevant Principle(s):** P1, P3, P4, P6, P7, P8
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Low
*   **Type:** Feature (API Integration)

---

#### TASK-036: Frontend Component - Display Top Gainers/Losers Visuals

*   **Task ID:** TASK-036
*   **Task Title:** Frontend Component - Display Top Gainers/Losers Visuals
*   **Description:** On the Index Detail page, display the fetched top gainers and losers using a visual representation (e.g., Bootstrap lists or small bar charts). Apply red/green color coding.
*   **PRD Reference(s):** FEAT-009, FR-9.1, FR-9.2, FR-9.3
*   **Acceptance Criteria (AC):**
    *   1. Top 3-5 gainers displayed visually in a dedicated section.
    *   2. Top 3-5 losers displayed visually in a dedicated section.
    *   3. Each item shows Stock Symbol and % Change.
    *   4. Red/green color coding applied correctly [Ref: P1, P11].
    *   5. Bootstrap components used for layout [Ref: P5].
    *   6. Unit tests verify display based on sample data [Ref: P4].
*   **Dependencies:** TASK-035
*   **Relevant Principle(s):** P1, P4, P5, P11
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Low
*   **Type:** Feature (Component)

---

#### TASK-037: Styling - Define Dark Mode Theme

*   **Task ID:** TASK-037
*   **Task Title:** Styling - Define Dark Mode Theme
*   **Description:** Define the color palette for dark mode. Implement the dark theme by overriding Bootstrap CSS variables or adding theme-specific CSS overrides. Ensure red/green conventions are maintained and contrast/readability meets WCAG AA.
*   **PRD Reference(s):** FEAT-013, FR-13.2, NFR-07
*   **Acceptance Criteria (AC):**
    *   1. Dark mode color palette defined and documented.
    *   2. CSS variables for colors updated/overridden for dark theme [Ref: P5].
    *   3. All components (heatmaps, charts, text, buttons) render correctly in dark mode.
    *   4. Red/green color coding remains clear and consistent [Ref: P11].
    *   5. Text/background contrast ratios meet WCAG AA in dark mode [Ref: P11].
    *   6. Implementation avoids excessive custom CSS, leveraging Bootstrap's theming capabilities [Ref: P5].
*   **Dependencies:** TASK-002
*   **Relevant Principle(s):** P1, P5, P11, P12
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Low
*   **Type:** Feature (Styling/Theme)

---

#### TASK-038: Interaction - Implement Dark Mode Toggle

*   **Task ID:** TASK-038
*   **Task Title:** Interaction - Implement Dark Mode Toggle
*   **Description:** Add a UI control (e.g., a simple button or switch using Bootstrap forms/buttons) to allow users to toggle between light (default) and dark themes. Use Alpine.js to manage the theme state and apply/remove a theme class (e.g., on the `<body>` tag).
*   **PRD Reference(s):** FEAT-013, FR-13.1
*   **Acceptance Criteria (AC):**
    *   1. A toggle control is visible in the UI (e.g., header/footer).
    *   2. Clicking the toggle switches between light and dark themes.
    *   3. Theme state is managed (e.g., by adding/removing a class on `<body>` via Alpine.js) [Ref: P5].
    *   4. The toggle's appearance reflects the current theme state.
    *   5. Theme preference could optionally be persisted (e.g., using localStorage).
    *   6. Unit/Integration tests verify toggle functionality and theme class application [Ref: P4].
*   **Dependencies:** TASK-037, TASK-003
*   **Relevant Principle(s):** P1, P4, P5
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Low
*   **Type:** Feature (Interaction/Theme)

---

#### TASK-039: API Integration - Fetch Overall Index Performance

*   **Task ID:** TASK-039
*   **Task Title:** API Integration - Fetch Overall Index Performance
*   **Description:** Implement logic to fetch the overall daily % change for Nifty 50 and Nifty Next 50 from the backend API.
*   **PRD Reference(s):** FEAT-014 (Data)
*   **Acceptance Criteria (AC):**
    *   1. JS function makes GET request to the backend API for overall index performance.
    *   2. Request uses HTTPS [Ref: P6].
    *   3. Loading/error states handled [Ref: P7].
    *   4. Successful response data processed.
    *   5. Unit tests cover API logic [Ref: P4].
*   **Dependencies:** TASK-004, Backend API Endpoint Ready [Ref: P3, P13]
*   **Relevant Principle(s):** P1, P3, P4, P6, P7, P8
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Low
*   **Type:** Feature (API Integration)

---

#### TASK-040: Frontend Component - Display Overall Index Indicators

*   **Task ID:** TASK-040
*   **Task Title:** Frontend Component - Display Overall Index Indicators
*   **Description:** On the Homepage, display small visual indicators (e.g., colored Bootstrap badges, progress bars, or simple custom elements) showing the overall daily % change for Nifty 50 and Nifty Next 50, using red/green color coding.
*   **PRD Reference(s):** FEAT-014, FR-14.1, FR-14.2, FR-14.3
*   **Acceptance Criteria (AC):**
    *   1. Indicators for Nifty 50 and Nifty Next 50 displayed near the top of the homepage.
    *   2. Indicators use data fetched in TASK-039.
    *   3. Indicators use standard red/green color coding [Ref: P1, P11].
    *   4. Implementation uses Bootstrap components/utilities where possible [Ref: P5].
    *   5. Unit tests verify indicator display and coloring [Ref: P4].
*   **Dependencies:** TASK-039, TASK-011 (Homepage structure)
*   **Relevant Principle(s):** P1, P4, P5, P11
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Low
*   **Type:** Feature (Component)

---

#### TASK-041: Frontend Component - Implement Candlestick Chart Option

*   **Task ID:** TASK-041
*   **Task Title:** Frontend Component - Implement Candlestick Chart Option
*   **Description:** Modify the Stock Detail chart component (TASK-018) to support rendering a Candlestick chart as an alternative to the Line chart, using the selected charting library's capabilities.
*   **PRD Reference(s):** FEAT-004 (Post-MVP Option)
*   **Acceptance Criteria (AC):**
    *   1. Charting library configured to render Candlestick charts.
    *   2. Requires appropriate data format from API (Open, High, Low, Close, Volume) - may need API update (TASK-026/Backend).
    *   3. Candlestick bodies colored red/green based on open/close price [Ref: P1, P11].
    *   4. Chart renders correctly when Candlestick type is selected.
    *   5. Unit tests verify Candlestick chart configuration [Ref: P4].
*   **Dependencies:** TASK-018, TASK-003, (Potentially) TASK-026 update, Backend API Update [Ref: P3, P13]
*   **Relevant Principle(s):** P1, P3, P4, P5, P11
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Low
*   **Type:** Feature (Component/Charting)

---

#### TASK-042: Interaction - Add Chart Type Switch Control

*   **Task ID:** TASK-042
*   **Task Title:** Interaction - Add Chart Type Switch Control
*   **Description:** Add a UI control (e.g., toggle buttons) on the Stock Detail page to allow users to switch between Line and Candlestick chart types (if TASK-041 is implemented).
*   **PRD Reference(s):** FEAT-004 (Post-MVP Option)
*   **Acceptance Criteria (AC):**
    *   1. UI control (e.g., Bootstrap button group) allows selection of "Line" or "Candlestick".
    *   2. Selecting a type updates the chart rendering (TASK-018 / TASK-041).
    *   3. Active chart type is visually indicated.
    *   4. Interaction managed possibly via Alpine.js [Ref: P5].
    *   5. Unit/Integration tests verify type switching and chart update trigger [Ref: P4].
*   **Dependencies:** TASK-041, TASK-003
*   **Relevant Principle(s):** P1, P4, P5
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Low
*   **Type:** Feature (Interaction)

---

## Phase 4: Cross-Cutting & Finalization

---

#### TASK-043: Documentation - Finalize README.md

*   **Task ID:** TASK-043
*   **Task Title:** Documentation - Finalize README.md
*   **Description:** Update the README.md to include comprehensive instructions for setup, configuration, build process, running locally, testing procedures, and any relevant architectural notes or Bootstrap customization details.
*   **PRD Reference(s):** N/A
*   **Acceptance Criteria (AC):**
    *   1. README covers project purpose.
    *   2. README details setup steps (prerequisites, clone, install).
    *   3. README explains configuration (environment variables, API URL) [Ref: P8].
    *   4. README lists and explains npm/yarn scripts (start, build, test, lint) [Ref: P4].
    *   5. README documents key architectural decisions and library usage (Bootstrap, HTMX, Alpine, Charting) [Ref: P12].
    *   6. README is well-formatted and easy to understand.
*   **Dependencies:** All previous tasks.
*   **Relevant Principle(s):** P4, P8, P12
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Medium
*   **Type:** Documentation

---

#### TASK-044: Documentation - Code Comments Review

*   **Task ID:** TASK-044
*   **Task Title:** Documentation - Code Comments Review
*   **Description:** Review the entire codebase (JS, CSS) to ensure adequate code comments are present for complex logic, non-obvious sections, component purposes, and any custom CSS or Bootstrap overrides/compositions.
*   **PRD Reference(s):** NFR-04
*   **Acceptance Criteria (AC):**
    *   1. Complex JavaScript functions/logic are commented.
    *   2. Purpose of components/modules is documented (e.g., JSDoc blocks).
    *   3. Custom CSS rules or complex Bootstrap utility combinations are explained [Ref: P12].
    *   4. Code review confirms sufficient commenting [Ref: P13].
*   **Dependencies:** All feature implementation tasks.
*   **Relevant Principle(s):** P12, P13
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Medium
*   **Type:** Documentation

---

#### TASK-045: Accessibility Audit & Remediation

*   **Task ID:** TASK-045
*   **Task Title:** Accessibility Audit & Remediation
*   **Description:** Perform an accessibility audit targeting WCAG 2.1 Level AA. Use automated tools (e.g., Axe) and manual checks (keyboard navigation, screen reader testing on key flows). Remediate identified issues. Pay attention to color contrast, semantic HTML, ARIA attributes (if needed), and keyboard operability.
*   **PRD Reference(s):** NFR-07
*   **Acceptance Criteria (AC):**
    *   1. Automated accessibility scan (e.g., Axe) run on all pages, reporting minimal critical/serious issues.
    *   2. Manual keyboard navigation tested for all interactive elements (tiles, buttons, toggles) [Ref: P11].
    *   3. Key user flows tested with a screen reader (e.g., NVDA, VoiceOver).
    *   4. Color contrast issues (text/background, UI elements) identified and fixed [Ref: P11].
    *   5. Semantic HTML structure reviewed and corrected where necessary [Ref: P11].
    *   6. Audit report generated and remediation documented.
*   **Dependencies:** All feature implementation tasks.
*   **Relevant Principle(s):** P11
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Medium
*   **Type:** Testing (Accessibility)

---

#### TASK-046: Performance Testing & Optimization

*   **Task ID:** TASK-046
*   **Task Title:** Performance Testing & Optimization
*   **Description:** Measure key performance metrics (LCP, page transition times, tooltip display time, chart rendering/update time) against NFR-01 targets using browser developer tools and potentially tools like Lighthouse. Identify bottlenecks and optimize frontend code (JS execution, rendering, asset loading) as needed.
*   **PRD Reference(s):** NFR-01
*   **Acceptance Criteria (AC):**
    *   1. LCP for Homepage measured (< 3s target).
    *   2. Page transition times measured (< 500ms target).
    *   3. HTMX Tooltip display time measured (< 200ms target).
    *   4. Chart rendering/update times measured (< 1s target).
    *   5. Performance bottlenecks identified (if any).
    *   6. Optimizations implemented where necessary (e.g., code splitting, image optimization, reducing DOM manipulation).
    *   7. Final performance measurements documented.
*   **Dependencies:** All feature implementation tasks.
*   **Relevant Principle(s):** P1
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Medium
*   **Type:** Testing (Performance)

---

#### TASK-047: Security Review (Frontend)

*   **Task ID:** TASK-047
*   **Task Title:** Security Review (Frontend)
*   **Description:** Review frontend code for potential security vulnerabilities, focusing on XSS (sanitizing API data before display), ensuring all API calls use HTTPS, and verifying secure usage of HTMX according to its documentation.
*   **PRD Reference(s):** NFR-06
*   **Acceptance Criteria (AC):**
    *   1. Review confirms data fetched from APIs is appropriately handled before rendering to prevent XSS.
    *   2. Review confirms all `fetch` or HTMX requests use HTTPS [Ref: P6].
    *   3. Review confirms HTMX usage aligns with security best practices (e.g., avoiding dangerous patterns) [Ref: P5].
    *   4. No obvious frontend security flaws identified.
*   **Dependencies:** All feature implementation tasks involving API data display or HTMX.
*   **Relevant Principle(s):** P5, P6
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** Medium
*   **Type:** Testing (Security)

---

#### TASK-048: Cross-Browser & Cross-Device Testing (Final Pass)

*   **Task ID:** TASK-048
*   **Task Title:** Cross-Browser & Cross-Device Testing (Final Pass)
*   **Description:** Perform final testing of the complete application across all target browsers (Chrome, Firefox, Safari, Edge - latest stable) and representative mobile devices/emulators (iOS Safari, Android Chrome) to ensure consistent functionality, layout, and styling.
*   **PRD Reference(s):** NFR-03
*   **Acceptance Criteria (AC):**
    *   1. Application functions correctly on latest Chrome, Firefox, Safari, Edge.
    *   2. Application functions correctly on iOS Safari and Android Chrome (using emulators or real devices).
    *   3. Layout renders correctly without major visual bugs across target environments [Ref: P10].
    *   4. Interactions (clicks, taps, tooltips, charts) work consistently.
    *   5. Testing checklist completed and signed off [Ref: P4].
*   **Dependencies:** All feature implementation tasks, TASK-022.
*   **Relevant Principle(s):** P4, P10
*   **Estimated Effort:** (Estimate Required)
*   **Priority:** High (Pre-Release)
*   **Type:** Testing

---