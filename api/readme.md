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

- Frontend (React UI): [https://todo.hidat.site](https://todo.hidat.site)
- Swagger/API Documentation: [https://todo-api.hidat.site](https://todo-api.hidat.site)

---

## 🛠️ Tech Stack

| Layer            | Technology                                  |
| ---------------- | ------------------------------------------- |
| Backend          | ASP.NET Core 9.0, Entity Framework Core 9.0 |
| Database         | MySQL 8.0                                   |
| Authentication   | JWT Bearer Token, BCrypt.Net                |
| Validation       | FluentValidation 11.9                       |
| API Docs         | Swagger/OpenAPI 6.5                         |
| Containerization | Docker, Docker Compose                      |

---

## 📋 Prerequisites

Before running the project locally or via Docker, ensure the following are installed:

- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
- [MySQL 8.0](https://dev.mysql.com/downloads/mysql/)
- [Docker & Docker Compose](https://www.docker.com/products/docker-desktop) (if deploying via containers)
- [Node.js & npm/yarn](https://nodejs.org/) (for frontend development if applicable)

---

## 📚 API Endpoints

### 🔐 Authentication

| Method   | Endpoint             | Description           | Auth Required |
| :------- | :------------------- | :-------------------- | :-----------: |
| **POST** | `/api/auth/register` | Register new user     |      ❌       |
| **POST** | `/api/auth/login`    | Login user            |      ❌       |
| **GET**  | `/api/auth/me`       | Get current user info |      ✅       |

### ✅ Tasks

| Method     | Endpoint         | Description          | Auth Required |
| :--------- | :--------------- | :------------------- | :-----------: |
| **GET**    | `/api/task`      | Get all user's tasks |      ✅       |
| **GET**    | `/api/task/{id}` | Get task by ID       |      ✅       |
| **POST**   | `/api/task`      | Create new task      |      ✅       |
| **PUT**    | `/api/task/{id}` | Update task          |      ✅       |
| **DELETE** | `/api/task/{id}` | Delete task          |      ✅       |

---

## 📁 Project Structure

```text
api/
├── Controllers/                 # API endpoints
│   ├── AuthController.cs        # Authentication endpoints
│   └── TaskController.cs        # Task management endpoints
├── Models/                      # Data models
│   ├── User.cs                  # User entity
│   ├── Task.cs                  # Task entity
│   └── DTOs/                    # Data transfer objects
├── Data/                        # Database context
│   └── AppDbContext.cs          # EF Core DbContext
├── Services/                    # Business logic
│   ├── IAuthService.cs          # Auth service interface
│   └── AuthService.cs           # Auth service implementation
├── Middleware/                  # Custom middleware
│   └── ExceptionHandlingMiddleware.cs
├── Migrations/                  # EF Core migrations
├── Properties/                  # Project properties
├── appsettings.json             # Configuration
├── Program.cs                   # Application entry point
├── Dockerfile                   # Docker configuration
├── docker-compose.yml           # Docker Compose setup
├── .env                         # Environment variables
└── TodoListApi.csproj           # Project file
```

## 📞 Contact

- 👤 Name: [Đoàn Văn Đạt]
- 📧 Email: [datdoan.dev@gmail.com](mailto:datdoan.dev@gmail.com)
- 🐙 GitHub: [@dat-dv](https://github.com/dat-dv)
