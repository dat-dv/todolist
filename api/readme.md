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

### ✨ Access the API

# 📚 API Endpoints

## 🔐 Authentication

| Method   | Endpoint             | Description           | Auth Required |
| :------- | :------------------- | :-------------------- | :-----------: |
| **POST** | `/api/auth/register` | Register new user     |      ❌       |
| **POST** | `/api/auth/login`    | Login user            |      ❌       |
| **GET**  | `/api/auth/me`       | Get current user info |      ✅       |

---

## ✅ Tasks

| Method     | Endpoint         | Description          | Auth Required |
| :--------- | :--------------- | :------------------- | :-----------: |
| **GET**    | `/api/task`      | Get all user's tasks |      ✅       |
| **GET**    | `/api/task/{id}` | Get task by ID       |      ✅       |
| **POST**   | `/api/task`      | Create new task      |      ✅       |
| **PUT**    | `/api/task/{id}` | Update task          |      ✅       |
| **DELETE** | `/api/task/{id}` | Delete task          |      ✅       |
