### Billing Software
# 🧾 Retail Billing Software

A full-stack retail billing system that allows store owners to manage inventory, customer orders, transactions, and handle online payments via Razorpay. Includes role-based access (Admin & User) with secure authentication.

---
📸 Screenshots (Optional)

![Dashboard](https://github.com/user-attachments/assets/5cdced69-7f6b-4811-a2c6-12d9836c374e)

![Screenshot (282)](https://github.com/user-attachments/assets/fcdf747c-16aa-47c5-958a-d399d9e523e4)

---
## 📁 Project Structure

billing-software/
|
|-- frontend/ # React, Bootstrap 5, Razorpay Integration
| |__ ...
|
|-- backend/ # Java, Spring Boot, MySQL
| |__ ...
|
|__ README.md

---

## 🚀 Features

- ✅ Authentication (Login with JWT)
- 🛡️ Role-based access (Admin / User)
- 🛒 Cart and order system
- 🧾 Billing and invoice management
- 📦 Inventory/category management
- 💳 Razorpay integration for payments
- 🖥️ Responsive UI (React + Bootstrap 5)

---

## 🧑‍💻 Tech Stack

### 🔹 Frontend:
- React.js
- Bootstrap 5
- Razorpay (Payment Gateway)
- Context API

### 🔸 Backend:
- Java 17
- Spring Boot
- Spring Security (JWT)
- JPA + MySQL
- RESTful APIs

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Project
git clone -> 

### 2️⃣ Frontend Setup
 - cd frontend
 - npm install
 - npm start

Configure service with your backend URL:
   - REACT_APP_BASE_URL=http://localhost:8080

### 3️⃣ Backend Setup
 - cd backend
 - ./mvnw spring-boot:run
   
Set up application.properties:
 - spring.datasource.url=jdbc:mysql://localhost:3306/billing_db
 - spring.datasource.username=root
 - spring.datasource.password=yourpassword
 - jwt.secret=yourSecretKey


📬 API Overview (Spring Boot)
  | Endpoint          | Method | Access | Description                  |
| ----------------- | ------ | ------ | ---------------------------- |
| `/api/v1.0/auth/login` | POST   | Public | User login                   |
| `/api/v1.0/category`   | CRUD   | Admin  | Manage categories            |
| `/api/v1.0/item`       | CRUD   | Admin  | Manage items                 |
| `/api/v1.0/order`      | POST   | User   | Create orders & transactions |


🔐 Authentication & Role Flow

  - On login, user receives a JWT token
  - Stored in localStorage
  - React app checks token and user role to guard routes (Admin/User)
  - Unauthorized users are redirected accordingly

🙌 Acknowledgments
  - Razorpay for payment gateway
  - React & Spring Boot community
