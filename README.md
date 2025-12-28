# 🗑️ स्वच्छ नगर (SwachhNagar) — Smart Waste Management System

> **स्वच्छ नगर** means *"Clean City"* in Hindi — a fitting name for a platform that digitizes and streamlines urban waste collection, routing, and citizen reporting.

SwachhNagar is a full-stack web application for managing municipal waste operations. It provides a role-based dashboard for admins, field staff, and citizens to coordinate collection schedules, manage vehicles and routes, track complaints, and visualize analytics — all in one platform.

[![TypeScript](https://img.shields.io/badge/TypeScript-84.1%25-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-Vite-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [User Roles](#-user-roles)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#1-backend-setup)
  - [Frontend Setup](#2-frontend-setup)
- [Environment & Configuration](#-environment--configuration)
- [Pages & Modules](#️-pages--modules)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

Urban waste management in Indian cities is largely undigitized — collection schedules are inconsistent, citizens have no way to report issues, and municipal staff work without route optimization or tracking tools.

**SwachhNagar** addresses this by providing:

- A **centralized dashboard** for admins to manage routes, vehicles, and staff
- **Digital scheduling** so collection times are predictable and trackable
- A **citizen portal** to submit complaints and receive notifications
- **Analytics & reports** to measure collection efficiency over time

The app uses a React + TypeScript frontend and a Node.js + Express backend, with support for multiple authentication contexts and role-based access control.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔐 **Role-Based Auth** | Separate access levels for Admin, Staff, and Citizen |
| 📅 **Collection Scheduling** | Create and manage waste pickup schedules by zone |
| 🗺️ **Route Management** | Define and optimize collection routes for field staff |
| 🚛 **Vehicle Management** | Track vehicles, assign to routes, monitor availability |
| 📢 **Citizen Reporting** | Citizens can submit waste-related complaints and issues |
| 🔔 **Notifications** | Status updates sent to citizens on complaint resolution |
| 📊 **Analytics Dashboard** | Visual reports on collection rates, complaints, and performance |
| 👥 **User Management** | Admin can add/remove staff and citizen accounts |

---

## 👥 User Roles

### 🔴 Admin
- Full access to all modules
- Manages staff accounts, routes, vehicles, and zones
- Views analytics and generates reports
- Reviews and resolves citizen complaints

### 🟡 Staff
- Views assigned routes and schedules
- Updates collection status (pending / in-progress / completed)
- Receives task assignments from admin

### 🟢 Citizen
- Registers and logs in to the portal
- Submits waste collection complaints with location details
- Tracks the status of their submitted reports
- Receives notifications on resolution

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI component library |
| **TypeScript** | Type-safe frontend code |
| **Vite** | Fast build tool and dev server |
| **React Router DOM** | Client-side routing |
| **Axios** | HTTP client for API calls |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js** | REST API framework |
| **MongoDB** *(optional)* | Persistent database (demo uses in-memory seeds) |
| **JWT** | Stateless authentication tokens |

---

## 📁 Project Structure

```
waste_management_system/
│
├── backend/                          # Node.js + Express REST API
│   ├── routes/                       # API route handlers
│   │   ├── auth.js                   # Login, register, token refresh
│   │   ├── collections.js            # Collection schedule CRUD
│   │   ├── routes.js                 # Route management
│   │   ├── vehicles.js               # Vehicle management
│   │   ├── complaints.js             # Citizen complaint CRUD
│   │   └── users.js                  # User management
│   ├── models/                       # Data models / schemas
│   ├── config.js                     # Server configuration
│   ├── config_fixed.js               # Alternate config variant
│   └── index.js                      # App entry point
│
├── frontend/                         # React + TypeScript + Vite SPA
│   ├── src/
│   │   ├── context/
│   │   │   ├── AuthContext.tsx        # Primary auth context
│   │   │   ├── AuthContext_fixed.tsx  # Fixed/stable auth variant
│   │   │   └── AuthContext_backend.tsx# Backend-integrated auth variant
│   │   ├── components/
│   │   │   ├── pages/
│   │   │   │   ├── Dashboard.tsx      # Main admin/staff home
│   │   │   │   ├── Analytics.tsx      # Charts and performance reports
│   │   │   │   ├── Collections.tsx    # Schedule management
│   │   │   │   ├── Routes.tsx         # Route management
│   │   │   │   ├── Vehicles.tsx       # Vehicle management
│   │   │   │   ├── Complaints.tsx     # Citizen complaint tracking
│   │   │   │   ├── Users.tsx          # User management (admin)
│   │   │   │   └── Notifications.tsx  # Notification center
│   │   │   └── shared/               # Reusable UI components
│   │   ├── main.tsx                  # App entry point
│   │   ├── main_fixed.tsx            # Alternate entry (App_fixed variant)
│   │   └── App_fixed.tsx             # Stable app variant
│   ├── index.html                    # HTML root (points to main_fixed.tsx)
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ → [Download](https://nodejs.org/)
- **npm** or **yarn**
- *(Optional)* MongoDB for persistent storage — demo works with in-memory seeds

---

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the development server
npm run dev
# or
node index.js
```

The backend will start on the port defined in `backend/config.js`. Check the terminal for the exact port (usually `http://localhost:5000`).

---

### 2. Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

The app will be available at `http://localhost:5173`.

> **Note:** `index.html` currently points to `src/main_fixed.tsx` which renders the `App_fixed` variant. If you want to use the original `main.tsx` / `App.tsx`, update the `<script>` tag in `index.html` accordingly.

---

## ⚙️ Environment & Configuration

### Backend (`backend/config.js`)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/swacchnagar
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Frontend — Auth Token Keys

Different `AuthContext` implementations use different `localStorage` keys. Make sure you use a consistent one across your app:

| Context File | Token Key | User Key |
|---|---|---|
| `AuthContext.tsx` | `token` | `user` |
| `AuthContext_fixed.tsx` | `auth_token` | `user_data` |
| `AuthContext_backend.tsx` | `token` | `user` |

> Use `AuthContext_fixed.tsx` for the most stable experience — it is the default in `main_fixed.tsx`.

---

## 🖥️ Pages & Modules

### 🏠 Dashboard
The main landing page after login. Shows:
- Summary stats: total collections today, pending complaints, active vehicles
- Quick action buttons for common tasks
- Recent activity feed

### 📅 Collections
- View, create, edit, and delete collection schedules
- Filter by zone, date, and status (Pending / In Progress / Completed)
- Assign staff and vehicles to a schedule

### 🗺️ Routes
- Define geographic collection routes by zone
- View all routes on a list with assigned vehicle and staff
- Edit or deactivate routes

### 🚛 Vehicles
- Full vehicle inventory (truck number, type, capacity, status)
- Mark vehicles as Active / Under Maintenance / Inactive
- Assign to collection routes

### 📢 Complaints (Citizen Reports)
- Citizens submit complaints with title, description, and location
- Admin/staff view all complaints with priority and status filters
- Status lifecycle: Submitted → Under Review → Resolved
- Resolution notes can be added before closing a complaint

### 📊 Analytics
- Charts showing collection completion rates over time
- Complaint volume and resolution time trends
- Vehicle utilization rates
- Zone-wise performance breakdown

> **Note:** The Analytics page reads auth tokens from context. If you see a "User token not found" error, ensure you are using the same `AuthContext` implementation throughout the app (see Troubleshooting).

### 🔔 Notifications
- System-generated notifications for key events
- Citizen notifications when their complaints are updated
- Staff notifications for new task assignments

### 👥 Users *(Admin only)*
- View all registered users by role
- Activate or deactivate accounts
- Reset passwords

---

## 🔧 Troubleshooting

### ❌ `useAuth must be used within an AuthProvider`

**Cause:** A component is calling `useAuth()` but is rendered outside the `<AuthProvider>`, or the app is mixing different `AuthContext` implementations.

**Fix:**
1. Check `index.html` to see which entry file (`main.tsx` or `main_fixed.tsx`) is loaded
2. Ensure all components import `useAuth` from the **same** context file
3. Confirm the root `App` is wrapped with the matching `<AuthProvider>`

---

### ❌ Analytics page shows blank or `"User token not found"`

**Cause:** The Analytics component reads the token using a key that doesn't match what the active `AuthContext` stores.

**Fix:** The token should come from the auth context directly:
```ts
const { token } = useAuth();
```
instead of `localStorage.getItem('token')`.

---

### ❌ Vite HMR errors after editing components

**Cause:** Hot Module Replacement can break when there are duplicate React context imports or circular dependencies.

**Fix:** Stop the dev server and restart:
```bash
npm run dev
```

---

## 🗺️ Roadmap

- [ ] Live map view for real-time vehicle tracking (GPS integration)
- [ ] Mobile-responsive PWA for field staff
- [ ] SMS/WhatsApp notifications for citizens via Twilio
- [ ] Route optimization using Google Maps / OSRM
- [ ] Multi-city / multi-zone support
- [ ] Export reports as PDF or Excel
- [ ] Hindi language UI option

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push and open a Pull Request

Please keep fixes scoped — for example: `fix(auth): normalize context imports`.

---

*स्वच्छ नगर — स्वच्छ भारत। Clean City, Clean India.* 🇮🇳

---

## 📄 License

Copyright (c) 2025 Atul Singh. All Rights Reserved.

This project and its source code are the exclusive intellectual property of the author.

**You are NOT permitted to:**
- Use, copy, or reproduce this code in any form
- Modify, adapt, or create derivative works
- Distribute, publish, or sublicense this code
- Use this project for commercial or personal purposes
- Deploy this application publicly or privately without explicit written permission from the author

**You ARE permitted to:**
- View the source code for educational/learning reference only

> ⚠️ Unauthorized use, reproduction, or distribution of this project, in whole or in part, may result in legal action.

For permissions or licensing inquiries, contact the author directly via [GitHub](https://github.com/atulsingh1501).
