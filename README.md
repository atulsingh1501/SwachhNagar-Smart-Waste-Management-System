# Waste Management System

Comprehensive Waste Management System (WMS) — web application for managing collections, routes, vehicles, users and citizen reports. This repository contains a Node/Express backend and a React + Vite frontend.

## Table of Contents
- **Overview**
- **Repository Structure**
- **Prerequisites**
- **Backend: Setup & Run**
- **Frontend: Setup & Run**
- **Environment / Configuration**
- **Troubleshooting**
- **Screenshots**
- **Contributing**
- **License**

## Overview

This project is a sample/learning implementation of a waste management dashboard with features including:
- Authentication (admin / staff / citizen)
- Collection scheduling and tracking
- Route and vehicle management
- Citizen reporting and notifications
- Basic analytics and reports

The frontend uses React + TypeScript + Vite and the backend uses Node.js + Express. Some modules demonstrate alternatives (e.g., `AuthContext_fixed`, `AuthContext_backend`) for demonstration/experimentation.

## Repository Structure

Top-level layout:

- `backend/` — Express server, routes and models
- `frontend/` — Vite + React frontend (TypeScript)
- `README.md` — this file
- `TODO.md` — project notes

Frontend important files:
- `frontend/src/context/` — authentication context implementations (`AuthContext.tsx`, `AuthContext_fixed.tsx`, `AuthContext_backend.tsx`)
- `frontend/src/components/` — UI components and pages (e.g., `Analytics.tsx`)
- `frontend/index.html` and `frontend/src/main*.tsx` — app entry points

Backend important files:
- `backend/routes/` — REST routes
- `backend/models/` — data models

## Prerequisites

- Node.js >= 18
- npm (or yarn)
- (Optional) MongoDB or other DB if you wire up production persistence — this repo includes memory/demo seeds

## Backend: Setup & Run

1. Change to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Start server (development):

```bash
npm run dev
# or
node index.js
```

4. The backend listens on the port configured in `backend/config.js` (defaults in repo may vary). See `index.js` for startup logs.

## Frontend: Setup & Run

1. Change to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Start the dev server:

```bash
npm run dev
# or
yarn dev
```

4. Open the app in your browser. The project `index.html` currently points at `src/main_fixed.tsx` which renders the `App_fixed` variant.

Notes:
- If you use a different entry (`main.tsx` / `App.tsx`) ensure `index.html` has the correct `script` tag.
- The app expects an auth token in the active `AuthContext` or localStorage. Different context implementations use different keys — see Troubleshooting below.

## Environment / Configuration

- Local session persistence keys seen in project:
  - `token` — used by some contexts and API calls
  - `auth_token` — used by `AuthContext_fixed`
  - `user` or `user_data` — stored user object in some contexts

- Backend configuration is in `backend/config.js` and `backend/config_fixed.js` (example variants). Update those to match your environment.

## Troubleshooting

Common issues and solutions:

- Error: "useAuth must be used within an AuthProvider"
  - Cause: A component calls `useAuth()` but is rendered outside of the corresponding `<AuthProvider>` or the app imports mixed/duplicate context implementations.
  - Fix: Ensure the root `App` is wrapped with the correct `AuthProvider`. Check `src/main_fixed.tsx` / `index.html` to verify which `App` is loaded. Normalize imports to the same `AuthContext_*` file across the frontend.

- Analytics shows a white/blank/error page with message "User token not found"
  - Cause: The analytics page attempts to read a token but the key differs between context and storage.
  - Fix: Prefer token coming from the auth context and fall back to common storage keys. (Recent commit updated `frontend/src/components/pages/Analytics.tsx` accordingly.)

- Dev server errors after editing components
  - Sometimes Vite HMR shows errors due to broken imports or duplicate React contexts. Restarting the dev server can help: stop and `npm run dev` again.

## Screenshots
Include screenshots in `frontend/screenshots/` and reference them in the README. Below are the images I will reference — place the exact files in `frontend/screenshots/` so they render in this README.

Files to add (recommended names):

- `frontend/screenshots/dashboard.png`
- `frontend/screenshots/users.png`
- `frontend/screenshots/routes.png`
- `frontend/screenshots/vehicles.png`
- `frontend/screenshots/reports.png`
- `frontend/screenshots/analytics-overview.png`
- `frontend/screenshots/analytics-scroll1.png`
- `frontend/screenshots/analytics-scroll2.png`
- `frontend/screenshots/analytics-insights.png`
- `frontend/screenshots/login.png`

When those images are present in the repo, they will appear here:

![Dashboard](frontend/screenshots/dashboard.png)

![Users](frontend/screenshots/users.png)

![Routes](frontend/screenshots/routes.png)

![Vehicles](frontend/screenshots/vehicles.png)

![Reports](frontend/screenshots/reports.png)

![Analytics Overview](frontend/screenshots/analytics-overview.png)

![Analytics Scroll 1](frontend/screenshots/analytics-scroll1.png)

![Analytics Scroll 2](frontend/screenshots/analytics-scroll2.png)

![Analytics Insights](frontend/screenshots/analytics-insights.png)

![Login](frontend/screenshots/login.png)

If you upload the images here or place them in `frontend/screenshots/` in the workspace, I will add and commit them for you.

## Contributing

- Fork the repo and make a new branch for changes.
- Keep related fixes scoped (e.g., `fix(auth): normalize imports`).
- Run linters and tests (if any) before submitting a PR.

## License

This repository does not include a specific license file. Add a `LICENSE` file if you plan to distribute the code publicly.

---

If you want I can also:

- Open a PR with the README changes, or
- Add the screenshot file if you provide the image, or
- Create a short contributing checklist / PR template.
# waste_management_system
