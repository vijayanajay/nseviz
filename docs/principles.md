1. Project Goal Alignment
Prioritize Visual Clarity & Performance: Every decision must support the core goals of a highly scannable, visual-first, performant dashboard (NFR-01, NFR-02). Leverage Bootstrap's components and grid for structure, but customize styling to meet the PRD's visual requirements (minimal text, intuitive interaction).
Adhere Strictly to PRD (with Bootstrap): All implementation must directly map to features (FEAT-) and requirements (FR-, NFR-*) defined in the Product Requirements Document, utilizing Bootstrap as the foundational CSS framework. No unapproved features or deviations.
2. Task Structure & Workflow
One-Story-Point Tasks: All development work must be broken down into granular user stories, estimated at one story point (representing roughly ≤ 1 day of work), as detailed in the initial backlog breakdown.
Explicit & Actionable: Each story must have clear, testable Acceptance Criteria (AC) using the "Given/When/Then" format.
Definition of Done (DoD): No story is complete until it meets all points in the agreed-upon DoD (code review passed, all ACs met, tests passing, functionality verified across target browsers/viewports using Bootstrap's responsive features, documentation updated, adheres to principles).
3. Phased Implementation & Dependencies
MVP First: Focus exclusively on implementing the MVP stories (Release 1) as prioritized. Features designated for Release 2 or 3 must not be implemented prematurely.
Foundation First: Foundational stories (Setup including Bootstrap integration, Core Layouts, Library Integrations) must be completed and reviewed before dependent feature stories begin.
Backend Dependency: Frontend development relies on the availability of specified Flask API endpoints. Frontend tasks requiring specific API data cannot be considered "Done" until the corresponding backend endpoint is functional and verified. Strict separation must be maintained.
4. Testing & Quality Mandate
Automated Testing is Paramount: All significant JavaScript logic (interactions, data processing via Alpine/HTMX) and key UI flows must be covered by automated tests. Aim for high confidence through automation.
Test Component Usage & Customizations: Verify correct usage of Bootstrap components and utilities. Test custom CSS overrides and ensure they integrate correctly with the framework without unintended side effects.
Specify Test Approach: While full TDD isn't mandated, tests should be written concurrently with implementation. Consider tools like Jest/Vitest for JS unit/integration tests and potentially Cypress or Playwright for end-to-end UI verification of critical paths (e.g., heatmap load, tooltip display, navigation, chart load, responsive layout breaks).
Manual Testing Limitation: Manual testing is only for exploratory purposes or verifying aspects difficult to automate (e.g., subjective visual feel across browsers/devices). It does not replace automated checks for regression or core functionality.
Linting & Code Standards: All code (HTML, CSS, JS) must adhere to agreed-upon linting rules (e.g., ESLint for JS, Stylelint for CSS - configured to work with Bootstrap classes, Prettier for formatting) and coding standards defined for the project (NFR-04). Linters must pass for code to be merged.
5. Frontend Technology Stack (Strict Adherence)
Bootstrap 5 Framework: Utilize Bootstrap 5 (latest stable version) as the primary CSS framework for layout, grid system, components (buttons, cards, tooltips, etc. where appropriate), and responsive utilities. Custom CSS should primarily be for overriding Bootstrap variables or adding specific styles not covered by Bootstrap utilities/components.
Leverage Bootstrap Features: Make effective use of Bootstrap's grid system (containers, rows, columns), utility classes (spacing, colors, flexbox, etc.), and pre-built components to accelerate development and ensure consistency.
CSS Variables & Customization: Customize Bootstrap's look and feel primarily through overriding Sass variables (if using the Sass source) or CSS variables. Write minimal additional custom CSS, scoped appropriately to avoid conflicts.
HTMX for Dynamics: Use HTMX as the primary method for interacting with the backend API to fetch data or HTML fragments for dynamic updates (e.g., tooltips FEAT-002, chart data updates FEAT-005, future index page loads FEAT-007). Adhere to HTMX security best practices (NFR-06).
Alpine.js for Local UI State: Employ Alpine.js only for minimal, localized UI interactivity and state management that is not suitable for HTMX (e.g., toggling active state on timeframe buttons FEAT-005, potential future dark mode toggle FEAT-013). Keep Alpine usage constrained and minimal.
Lightweight Charting Library: Use the selected lightweight charting library (e.g., Chart.js, ApexCharts, Frappe Charts - per PRD Section 6) for all chart rendering (FEAT-004, FEAT-008). Ensure integration is performant (NFR-01) and styles align with the Bootstrap theme.
HTML5: Use semantic HTML5 elements where appropriate (NFR-07), integrating Bootstrap classes for structure and styling.
6. Backend Interaction Protocol
Single Source of Truth: The frontend must fetch all market data, stock information, and dynamic content exclusively from the backend Flask API endpoints defined in the API contract. No direct calls to external services (like yfinance) from the frontend.
HTTPS Enforcement: All API calls must be made over HTTPS (NFR-06).
API Contract Adherence: Strictly adhere to the request/response formats defined by the backend API contract.
7. Structured Error Handling & Data States
Graceful API Error Handling: Implement robust handling for API request failures or errors returned by the backend. Utilize Bootstrap components (e.g., Alerts) to display user-friendly, non-technical error messages or visual indicators (e.g., "Data unavailable," "Could not load chart"). The application must never crash due to an API error.
Loading States: Provide clear visual feedback (e.g., Bootstrap spinners, skeleton loaders) when data is being fetched asynchronously (Homepage heatmap load, tooltip appearance, chart loading/updating) to manage user perception of performance (NFR-01, NFR-08).
Data Accuracy & Attribution: Display fetched data accurately. Include required data source attribution (Yahoo Finance) and disclaimers as specified (NFR-08).
8. Environment Configuration Standard
No Hardcoded Configuration: API base URLs or any other environment-specific settings must not be hardcoded. Use build-time environment variables or a simple configuration file (e.g., config.js loaded dynamically or populated at build time) managed outside version control for sensitive details.
Document Configuration: Clearly document any required configuration variables or settings in the project's README.md.
9. Separate Dev and Prod Environment Config Clearly
Distinct Endpoints: Ensure development environment connects to development/staging backend APIs, and the production build connects only to the production backend API.
Build Process: The build/deployment process must ensure the correct configuration is applied for each environment.
10. Responsive Design Mandate (Bootstrap Grid)
Leverage Bootstrap Grid: Implement responsive layouts primarily using Bootstrap's grid system (containers, rows, col-* classes) and responsive utility classes (e.g., d-none, d-md-block).
Test Across Breakpoints: Test thoroughly across Bootstrap's standard breakpoints (xs, sm, md, lg, xl, xxl) to ensure usability and visual consistency on all device sizes (FR-10.1).
Interaction Parity: Ensure interactions (tile clicks, tooltips via tap/hold) are functional and usable on both touch and non-touch devices (FR-10.3). Ensure Bootstrap components used are touch-friendly.
11. Accessibility (WCAG AA Target)
Target WCAG 2.1 AA: Strive to meet WCAG 2.1 Level AA guidelines where feasible within the project constraints (NFR-07). Leverage Bootstrap's accessibility features where available, but verify compliance.
Focus Areas: Pay particular attention to color contrast (text/background, UI elements - ensure custom theme meets AA), semantic HTML structure, keyboard navigation (Bootstrap components should support this), and providing appropriate ARIA attributes where necessary, especially if customizing components.
Known Limitation: Acknowledge that relying solely on red/green color intensity for magnitude (FR-1.4, FR-11.3) presents an accessibility challenge. Implement according to PRD for MVP, but ensure other AA guidelines are met.
12. Documentation & Code Quality
Code Comments: Add clear comments for complex logic, non-obvious code sections, and component purposes, especially explaining custom CSS or complex Bootstrap compositions (NFR-04).
README: Maintain an up-to-date README.md covering project setup (including Bootstrap integration/customization steps), build process, configuration, and how to run the application locally.
Document Bootstrap Usage: Document any significant Bootstrap variable overrides, custom CSS added, or specific ways components are combined or customized.
Maintainability: Write clean, well-structured, and modular code (HTML, CSS, JS) to facilitate future maintenance and updates (NFR-04). Minimize code duplication, leveraging Bootstrap utilities where possible.
13. Handover & Review
Code Reviews Mandatory: All code must be reviewed by at least one other team member before merging into the main branch. Reviews check for adherence to principles, code quality, correctness, test coverage, and proper Bootstrap usage.
Frontend Waits for Backend: Frontend stories dependent on specific API endpoints cannot be completed until those endpoints are delivered and verified by the backend team.