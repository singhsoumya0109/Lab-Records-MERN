# 🚀 MERN Authentication System

A **MERN stack authentication system** with separate frontends for **students and admins**, allowing users to **register, log in, and access role-based functionalities**.

## 🌟 Tech Stack
- 🏫 **Student Frontend** → React (Port `5173`)  
- 🛠 **Admin Frontend** → React (Port `5174`)  
- ⚡ **Backend** → Node.js / Express.js (Port `5001`)  
- 🛢 **Database** → MongoDB (Local or Atlas)  

---

## 🚀 Features
✔️ **Student & Admin Registration**  
✔️ **Login with JWT Authentication**  
✔️ **Role-based Access Control**  
✔️ **MongoDB for Data Storage**  
✔️ **Bcrypt for Secure Password Hashing**  
✔️ **Express.js API with Protected Routes**  

---

## 📂 Environment Variables  
Create a `.env` file in the parent directory and add the following:  

```ini
PORT=5001
MONGO_URL=mongodb://127.0.0.1:27017/Lab_Record
JWT_SECRET=hello
