# NSEViz Frontend Build & Deployment Guide

## Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm (comes with Node.js)

## Production Build
To generate a production-ready build (minified JS & CSS):

```sh
npm install
npm run build
```
- Minified files will be created in `frontend/dist/`:
  - `main.min.js`, `base.min.css`, `components.min.css`, `layouts.min.css`, `dark-mode.min.css`, `index.html`, `logo.svg`

## Running Automated Frontend Tests
To run all automated frontend tests (Jest, Cypress, Stylelint):

```sh
npm run test:all
```
- All tests must pass before deployment.

## Serving the Production Build
To serve the minified frontend locally (for preview):

```sh
npx serve frontend/dist
```

## Local Development (Frontend + Backend)

To run both the Flask backend and the frontend static server in parallel for development:

1. Build the frontend once:
   ```sh
   npm install
   npm run build
   ```

2. Start both servers (backend on port 8080, frontend on port 3000):
   ```sh
   npm run dev
   ```
   - Flask backend: http://localhost:8080 (API)
   - Frontend static server: http://localhost:3000

The frontend is configured to proxy API requests to the backend in development, so fetch('/api/heatmap-data') will work automatically.

## Deployment
- Deploy the contents of `frontend/dist/` to any static web server (e.g., Netlify, Vercel, S3, Nginx, Apache).
- No build tools or frameworks are required on the server—just static assets.

## Notes
- All build and test steps are automated via npm scripts in `package.json`.
- Do not edit files in `frontend/dist/` directly; always rebuild from source.
- For backend/API deployment, see backend/README.md (if available).

---
For questions or issues, please refer to the project documentation or contact the maintainers.
