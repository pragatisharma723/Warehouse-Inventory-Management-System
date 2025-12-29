# 📦 Warehouse Inventory Management System

A **full-stack Warehouse Inventory Management System** built to manage products, batches, inventory levels, and reorder alerts efficiently.  
The project uses **MySQL** for structured data storage, **Node.js + Express.js** for backend APIs, and a **React-based frontend**, all running locally on **localhost**.

---

## 🧩 Project Overview

This system helps warehouses track:

- Products and their details
- Batch-wise stock entries
- Real-time inventory availability
- Automatic low-stock (reorder) alerts
- Dashboard-level summaries for quick insights

The backend ensures **data consistency across product, batch, and inventory tables**, while automatically generating alerts when stock falls below reorder levels.

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React.js
- 🎨 HTML, CSS, JavaScript
- 🔄 Axios (API communication)

### Backend
- 🟢 Node.js
- 🚀 Express.js
- 🔐 CORS & JSON middleware

### Database
- 🗄️ MySQL
- Structured relational schema
- SQL joins for inventory & batch tracking

### Tools & Environment
- 🧪 Postman (API testing)
- 💻 VS Code
- 🖥️ Localhost (development environment)

---

## 📂 Core Modules & Features

### 🔹 Product Management
- Add, view, and delete products
- Stores category, unit, description, quantity, and reorder level
- Auto-links products with batches and inventory

### 🔹 Batch Management
- Each product entry automatically creates a batch
- Batch tracks quantity, manufacturing date, expiry date, and shelf mapping

### 🔹 Inventory Management
- Tracks available stock batch-wise
- Automatically fetches product IDs from batch data
- Updates inventory in real-time
- Supports inventory insert and update APIs

### 🔹 Reorder Alert System
- Automatically triggers alerts when stock goes below reorder level
- Alerts stored in a dedicated table
- Accessible via API for frontend display

### 🔹 Dashboard Summary
- Total products
- Total batches
- Total inventory entries
- Total reorder alerts

---

## 🔗 Backend API Endpoints

### Products
- `GET /products` – Fetch all products
- `POST /products` – Add product (auto batch + inventory)
- `DELETE /products/:id` – Delete product

### Batches
- `GET /batches` – View all batches with product & shelf details

### Inventory
- `GET /inventory` – View inventory with product & shelf mapping
- `POST /inventory` – Add inventory (auto-fetch product ID)
- `PUT /inventory/:batch_id` – Update stock quantity

### Alerts
- `GET /alerts` – View reorder alerts

### Dashboard
- `GET /dashboard/summary` – Inventory statistics overview

---

## 🗃️ Database Design (High Level)

### Main Tables
- `product`
- `batch`
- `inventory`
- `shelf`
- `reorder_alert`

### Relationships
- One product → multiple batches
- Each batch → one inventory record
- Inventory linked to shelf & product
- Alerts linked to product ID

---

## 🚀 How to Run Locally

```bash
# Clone repository
git clone https://github.com/your-username/warehouse-inventory-management.git

# Backend setup
cd backend
npm install
node index.js

# Frontend setup
cd frontend
npm install
npm start
- Backend runs on: `http://localhost:5000`
- Frontend runs on: `http://localhost:3000`

---

## 📌 Key Highlights
- Automatic batch & inventory creation
- SQL joins for accurate inventory tracking
- Clean REST API design
- Scalable backend structure
- Real-world warehouse use case

---

## 🔮 Future Enhancements
- Authentication & role-based access
- Advanced analytics & charts
- Export inventory reports
- Cloud database deployment
- Barcode / QR-based inventory tracking

---


## 👩‍💻 Author

**[Pragati Sharma](https://github.com/pragatisharma723)**  
UI/UX Enthusiast | Backend Developer | Web Development Learner
