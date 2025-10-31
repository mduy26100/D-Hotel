# 🏨 Hotel Booking Management System

A full-stack web application for managing hotels, rooms, users, and bookings.  
Developed using **ASP.NET Core Web API** for the backend and **ReactJS** for the frontend.  
The system provides both **user features** (booking rooms, managing profiles) and **admin features** (managing hotels, rooms, and users).

---

## 🌍 Live Demo

- 🌐 **Frontend-WEB:** https://d-hotel-booking.vercel.app/
- 🌐 **Frontend-Manager:** https://d-hotel-booking.vercel.app/

---

## 🧱 Tech Stack

| Layer              | Technologies                                              |
| ------------------ | --------------------------------------------------------- |
| **Frontend**       | ReactJS, React Router, Axios, TailwindCSS, Vite           |
| **Backend**        | ASP.NET Core 8, Entity Framework Core, LINQ, AutoMapper   |
| **Database**       | Microsoft SQL Server                                      |
| **Authentication** | JWT (JSON Web Token), Role-based Authorization            |
| **Architecture**   | Onion Architecture (Clean Architecture), SOLID Principles |
| **Deployment**     | Vercel (Frontend) & Somee / VPS (Backend)                 |

---

## ✨ Features Overview

### 👥 Authentication & Authorization

- User registration & login using JWT
- Role-based access control (Admin / User)
- Token refresh & secure route protection

### 🏨 Hotel & Room Management

- Admin can create, update, and delete hotels and rooms
- Upload room images and edit room details
- Pagination, sorting, and searching for rooms

### 📅 Booking System

- Check room availability by date and time
- Create, view, and cancel bookings
- Real-time validation on overlapping bookings

### 🧑‍💼 Admin Dashboard

- Manage users, hotels, rooms, and bookings
- View total revenue, occupancy rates, and top-performing rooms
- Dashboard charts and summary statistics

### ⚙️ API & Error Handling

- CRUD endpoints with validation
- Global exception middleware
- Custom response models for consistency

---

### 🧩 Architecture Overview

The backend follows Onion Architecture (Clean Architecture) to ensure maintainability and scalability.

Core Layer: Entities, Interfaces, and DTOs

Infrastructure Layer: EF Core, Repository, Database Context

Application Layer: Business Logic, Services

API Layer: Controllers, Middlewares, Configurations

Frontend follows a modular component-based structure using ReactJS + Vite for fast build times.

🧱 You can add your own detailed folder structure here.

### 🧑‍💻 Development Highlights

Designed RESTful APIs following Clean Architecture principles

Applied SOLID and common Design Patterns for maintainable code

Implemented JWT Authentication and Role-based Authorization

Integrated Entity Framework Core for ORM and database management

Used Axios in React for data fetching with centralized API handling

UI styled with TailwindCSS for speed and responsiveness

### Deployment

Backend (.NET): VPS Windown

Frontend (ReactJS): Vercel
