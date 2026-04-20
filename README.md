# 🏠 Room Rental Finder for Students

A full-stack web application that helps students in Cambodia **easily find affordable rental rooms near universities**, while allowing landlords to **list and manage their properties online**.

---

## 🚀 Overview

In Cambodia, students usually search for rental rooms through Facebook groups. This creates several problems:

- ❌ Outdated listings
- ❌ No proper filtering system
- ❌ No structured data (price, location, etc.)
- ❌ Hard to contact landlords
- ❌ No trust or verification system

### 💡 Solution

This platform provides a centralized system where:
- Students can search rooms easily
- Landlords can manage listings professionally
- Admins can monitor and control the system

---

## 🎯 Key Features

### 👨‍🎓 Student Features
- Search rental rooms
- Filter by price, location, university
- View detailed room information
- Save favorite rooms
- Contact landlords directly

### 🏠 Landlord Features
- Add new room listings
- Upload room images
- Edit or delete rooms
- Track room performance (views & engagement)

### 🛡️ Admin Features
- Manage all users (students & landlords)
- Monitor platform activity
- View analytics dashboard
- Control system data

---

## 🧱 Tech Stack

### Frontend
- Vue 3 (Composition API)
- Tailwind CSS
- Vue Router
- Axios
- Chart.js (Analytics)

### Backend
- Laravel 11 (REST API)
- Laravel Sanctum (Authentication)
- MySQL Database

---

## 🏗️ System Architecture


Frontend (Vue 3)
↓
API Requests (Axios)
↓
Laravel 11 API (Sanctum Auth)
↓
MySQL Database


---

## 📁 Project Structure

### 🔵 Frontend (Vue 3)


src/
├── api/
├── components/
├── pages/
├── layouts/
├── router/
├── services/
├── store/
└── App.vue


---

### 🟢 Backend (Laravel)


app/
├── Http/Controllers/
├── Models/
├── Services/

database/
├── migrations/

routes/
└── api.php


---

## 🔐 Authentication System

This project uses **Laravel Sanctum** for secure authentication.

### Roles System:
- Student
- Landlord
- Admin

Each role has different permissions and access levels.

---

## 📡 API Endpoints

### 🔑 Authentication

POST /api/register
POST /api/login
POST /api/logout


### 🏠 Rooms

GET /api/rooms
GET /api/rooms/{id}
POST /api/rooms
PUT /api/rooms/{id}
DELETE /api/rooms/{id}


### ⭐ Favorites

GET /api/favorites
POST /api/favorites


### 🛡️ Admin

GET /api/admin/users
GET /api/admin/analytics


---

## ⚙️ Installation Guide

### 1️⃣ Clone Project
```bash
git clone https://github.com/your-repo/room-rental-finder.git
cd room-rental-finder
2️⃣ Backend Setup (Laravel)
cd backend

composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
3️⃣ Frontend Setup (Vue 3)
cd frontend

npm install
npm run dev
🌍 Environment Variables
Laravel .env
APP_NAME="Room Rental Finder"
APP_URL=http://localhost:8000

DB_DATABASE=room_rental
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:5173
📊 Features Roadmap
🔥 Current Features
Room listing system
Authentication system
Favorites system
Admin dashboard
🚀 Future Features
Real-time chat system
Google Maps integration
Online payment system
Mobile app (Flutter / Kotlin)
AI-based room recommendations
Email & push notifications
🔐 Security Features
Role-based access control (RBAC)
API authentication via Sanctum
Input validation & sanitization
Protected admin routes
Secure password hashing
🚀 Deployment Guide
Frontend Deployment
Vercel / Netlify
Backend Deployment
Laravel hosting (shared VPS or cloud server)
Database
MySQL (production server)
🤝 Contribution Guide

If you want to contribute:

Fork the repository
Create new branch
Make changes
Submit pull request
📜 License

This project is created for educational and startup development purposes.

👨‍💻 Developer

Built as a startup project:

Room Rental Finder for Students (Cambodia)
Helping students find better housing easily and safely.

❤️ Vision

To become the leading student rental platform in Cambodia, replacing outdated Facebook-based rental searching with a structured, modern system.


---

# 💡 Critical improvement note (important)

This README is now:
- startup-level (not student-level)
- structured like SaaS product
- includes architecture + roadmap
- ready for GitHub + investors

---

If you want next upgrades, I can also generate:

- 📊 Investor Pitch Deck (PowerPoint structure)
- 🧠 System Design Diagram (real architecture image)
- 🚀 Deployment guide (production Laravel + Vue hosting)
- 🔥 API documentation (Swagger-style)