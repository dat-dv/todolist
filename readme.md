# TodoList API

A modern, production-ready RESTful API for managing todo tasks with JWT authentication. Built with clean architecture principles using ASP.NET Core 9.0 and MySQL.

## 📋 Overview

This project demonstrates best practices in building secure, scalable web APIs with:

- **Feature-based organization** - Code organized by features, not layers
- **Clean separation of concerns** - Clear boundaries between business logic and infrastructure
- **Secure authentication** - Industry-standard JWT token authentication
- **Comprehensive validation** - FluentValidation for robust input validation
- **Auto-documentation** - Interactive Swagger/OpenAPI documentation
- **Container-ready** - Full Docker and Docker Compose support
- **Database migrations** - Automatic database setup and migrations

Perfect for learning modern ASP.NET Core development or as a starter template for your next project.

## ✨ Features

- 🔐 **JWT Authentication & Authorization** - Secure token-based authentication
- ✅ **Task Management** - Full CRUD operations for todo tasks
- 👤 **User Management** - Registration, login, and profile management
- 🗄️ **MySQL Database** - Reliable data persistence with EF Core
- 📝 **Swagger Documentation** - Interactive API documentation
- 🐳 **Docker Support** - Easy deployment with Docker Compose
- 🔄 **Auto Migrations** - Database schema automatically updated on startup
- 🛡️ **Global Exception Handling** - Consistent error responses
- ✨ **Input Validation** - Comprehensive request validation

## 🚀 Quick Start with Docker Compose

The easiest way to get started is using Docker Compose, which will set up both the API and MySQL database automatically.

### Prerequisites

- Docker Desktop (Windows/Mac) or Docker Engine + Docker Compose (Linux)
- Git

### Start the Application

```bash
# From root project run
# Start all services in detached mode
docker-compose up -d --build
```

### Access the API

Swagger UI: http://localhost:5266/index.html
`# Note: If you cannot access Swagger UI, try using a private/incognito browser window. Some browsers may cache old responses or have CORS issues.`

### Stop the Application

```bash
# From root project run
# Stop all services
docker-compose down

# Stop and remove all data (including database)
docker-compose down -v
```
# 📚 API Endpoints

## 🔐 Authentication

| Method | Endpoint | Description | Auth Required |
|:-------|:----------|:-------------|:--------------:|
| **POST** | `/api/auth/register` | Register new user | ❌ |
| **POST** | `/api/auth/login` | Login user | ❌ |
| **GET**  | `/api/auth/me` | Get current user info | ✅ |

---

## ✅ Tasks

| Method | Endpoint | Description | Auth Required |
|:-------|:----------|:-------------|:--------------:|
| **GET** | `/api/task` | Get all user's tasks | ✅ |
| **GET** | `/api/task/{id}` | Get task by ID | ✅ |
| **POST** | `/api/task` | Create new task | ✅ |
| **PUT** | `/api/task/{id}` | Update task | ✅ |
| **DELETE** | `/api/task/{id}` | Delete task | ✅ |
