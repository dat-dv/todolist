# 🚀 TodoList API - Docker Deployment Guide

A full-stack Todo List application with .NET Core backend, React frontend, and MySQL database.

---

## 📋 Prerequisites

- Docker & Docker Compose installed
- Ports available: **2000** (MySQL), **5266** (Backend), **5367** (Frontend)

---

## 🔧 Environment Setup

### 1. 📦 Create Environment File & Build Project

```bash
# Create a new .env from .env.be and .env.fe
rm -f .env
cat .env.be .env.fe > .env

# Copy to project folders
cp .env.fe ./ui/.env
cp .env.be ./api/.env

# Build & Run
docker compose up -d --build
```

> **⚠️ IMPORTANT SECURITY NOTE:**  
> For demonstration and deployment convenience, this project includes `.env.be`, and `.env.fe` committed to the repository.
>
> **In production environments, NEVER commit these files!**
>
> - Add them to `.gitignore`
> - Store secrets in environment variables or secure vaults (Azure Key Vault, AWS Secrets Manager, etc.)
> - Use different secrets for each environment (dev, staging, production)
>
> These example files are provided **only** for quick local/demo setup.
>
> **Note:** We merge backend and frontend .env files and copy them into their respective folders so both Docker Compose and individual builds can access the correct environment variables.

---

### 2. 🔧 Troubleshooting - If You Encounter Issues

```bash
# Stop and remove containers, networks, volumes of this project
docker compose down -v

# Remove leftover containers
docker rm -f todolist_mysql todolist_backend todolist_frontend 2>/dev/null

# Remove specific volumes
docker volume rm todolistapp_mysql_data 2>/dev/null

# Remove specific network
docker network rm todolistapp_network 2>/dev/null

# Then rerun step #1
```

### 3. 🌐 Access the Application

After successful build:

| Service             | URL                              |
| ------------------- | -------------------------------- |
| **Frontend**        | http://localhost:5367            |
| **Backend API**     | http://localhost:5266/api        |
| **Backend Swagger** | http://localhost:5266/index.html |
| **MySQL**           | localhost:2000                   |

---

## 🗂️ Project Structure

```
TodoList_merge/
├── api/                    # .NET Core Backend
│   ├── Dockerfile
│   └── readme.md
├── ui/                     # React Frontend
│   ├── Dockerfile
│   └── readme.md
├── docker-compose.yml      # Docker orchestration
├── .env.be                 # Backend environment template
├── .env.fe                 # Frontend environment template
└── readme.md               # This file
```

---

## 📖 Additional Documentation

- [Backend (.NET Core) Documentation](./api/readme.md) – Detailed API setup, endpoints, and environment variables
- [Frontend (React) Documentation](./ui/readme.md) – Build steps, scripts, and configuration
- [Docker Compose Reference](https://docs.docker.com/compose/) – Advanced configuration and troubleshooting

## 📞 Contact

- 👤 Name: [Đoàn Văn Đạt]
- 📧 Email: [datdoan.dev@gmail.com](mailto:datdoan.dev@gmail.com)
- 🐙 GitHub: [@dat-dv](https://github.com/dat-dv)
