# Company CRUD Dashboard

A full-stack web application to manage company data with a **backend API** and a **frontend dashboard**.  
The backend is built with **Node.js, Express, and MongoDB**, while the frontend uses **React.js** with **TailwindCSS** for styling.

---

## Features

- **Backend:**
  - Create, read, update, delete companies (CRUD)
  - Filter companies by Name, Location, Industry, and Size range
  - RESTful API endpoints
  - MongoDB as the database

- **Frontend:**
  - Responsive dashboard built with React.js
  - Modern UI styled with TailwindCSS
  - Add, view, delete companies
  - Dynamic search by name or industry
  - Real-time updates as you type

---

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Frontend:** React.js, TailwindCSS, Axios, Vite  
- **Tools:** VS Code, Postman

---

## Project Structure
```bash
companies-api/
│
├── backend/ # Express server and API
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── controllers/ # Request handlers
│ └── server.js # Entry point for backend
│
└── frontend/ # React dashboard
├── src/ # React components
├── public/ # Static assets
├── package.json # Frontend dependencies
└── vite.config.js # Vite config
```


---

## Installation

### 1. Clone the repo

```bash
git clone https://github.com/your-username/CompanyAPI_CRUD.git
cd CompanyAPI_CRUD
```
### 2. Bcakend Setup
```bash
cd backend
npm install
npm run dev

Backend runs on http://localhost:5000
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
npm run dev
Frontend runs on http://localhost:5173
```
## Usage

Open the frontend URL in the browser.

Add new companies via the "Add Company" form.

Search dynamically by name or industry.

View all companies in a responsive table.

Delete companies using the "Delete" button.
