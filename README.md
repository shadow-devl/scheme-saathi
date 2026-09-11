# Scheme Saathi - The Complete Entrepreneur Platform

![Scheme Saathi Platform](https://img.shields.io/badge/Status-In%20Development-emerald.svg)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node.js%20%7C%20Prisma-blue.svg)

---

## 🌍 **Access the Live Website Globally**
👉 **[Click here to open the Scheme Saathi Platform](https://scheme-saathi.github.io)** 👈

*(The platform is fully deployed and accessible from anywhere via the link above)*

---

**Scheme Saathi** is a comprehensive, all-in-one entrepreneurial ecosystem designed to guide founders through every stage of their business journey: from ideation and validation to business creation, funding, operations, and growth.

Rather than a loose collection of tools, Scheme Saathi acts as a cohesive "Business Graph," providing a unified experience with shared identity, authorization, and trust across all its modules.

## 🚀 Key Features

*   **Integrated CRM & Pipeline:** Manage leads, track deals, and maintain a robust customer directory.
*   **Project & Task Operations:** Built-in milestone tracking, task delegation, and progress visualization.
*   **Financial Hub:** Keep a close eye on revenue, expenses, and outstanding invoices.
*   **E-Commerce Storefront:** Manage both physical and digital product catalogs directly from the dashboard.
*   **AI Gateway & Workflows:** Configure smart agents to automate triggers and repetitive tasks across your business.
*   **Global Ecosystem:** Built-in discovery for global investors and government support schemes.
*   **Premium Aesthetics:** A state-of-the-art UI featuring glassmorphism, dark mode, and emerald accents.

## 🛠️ Technology Stack

*   **Frontend:** React (Vite), Tailwind CSS, Lucide Icons, React Router
*   **Backend:** Node.js, Express.js
*   **Database:** SQLite (Development) / PostgreSQL (Production ready via Prisma ORM)

## 📦 Getting Started

To run the platform locally, you will need to start both the frontend and backend servers.

### 1. Backend Setup

```bash
cd backend
npm install
# Initialize Prisma and apply database migrations
npx prisma generate
npx prisma db push
# Start the server
node server.js
```
*The backend server runs on http://localhost:3001*

### 2. Frontend Setup

```bash
cd frontend
npm install
# Start the development server
npm run dev
```
*The frontend development server runs on http://localhost:5173*

## 🌐 Platform Architecture

Scheme Saathi's architecture is split into a robust Node.js backend (handling AI requests, data persistence, and core business logic) and a highly interactive, responsive React frontend.

The database is structured via **Prisma**, connecting the various modules (Users, Organizations, CRM Deals, Invoices, AI Workflows) so that data flows seamlessly throughout the business lifecycle.
