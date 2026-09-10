# CarCare-Pro | Auto Mobile Center

A modern Automobile Service & Repair Management web application built with **React.js (JSX)**, **Bootstrap 5 & Bootstrap Icons**, and a persistent **JSON Database** synchronized with `localStorage`.

---

## 🚀 Quick Start

1. **Install Dependencies** (already installed in workspace):
   ```bash
   npm install
   ```

2. **Start Vite Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🔑 Demo Credentials

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@carcarepro.com` | `admin` | Full Workshop Control Desk (`/admin`) |
| **Customer** | `user@example.com` | `user` | Customer Garage, History & Bookings |
| **Customer 2** | `sarah@example.com` | `user` | Preloaded Customer Account |

*Note: You can also use the 1-click demo filler buttons directly on the `/login` page, or register a new custom account on `/register`.*

---

## 📦 Features

- **Navigation Bar**: Responsive Bootstrap navbar with logo, role badges, active links, and auth controls.
- **Hero Section**: Automobile repair highlights, value propositions, stats, and quick appointment trigger.
- **Book a Service**: Interactive booking wizard with vehicle selection (from garage or new), slot picker, issue description, and live pricing estimates.
- **My Vehicles**: Garage manager allowing customers to add, view, and schedule services for their cars.
- **Service History**: Multi-status filter (`Pending`, `Confirmed`, `In Progress`, `Completed`, `Cancelled`), technician inspection feedback, and printable digital invoices.
- **Admin Dashboard**: Workshop KPI metrics, status updates, technician assignments, service catalog editor, fleet inspector, and demo data reset.
- **Dual Authentication**: Role-separated customer and admin credentials, form validation, and route guards (`ProtectedRoute`, `AdminRoute`).
- **Database (JSON)**: Initial pre-seeded data in `src/data/` with automatic browser persistence.
