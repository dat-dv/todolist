🚀 How to Run Docker for Each Project

# 1. 🧩 TodoListApi (Backend)

To run the backend API, follow these steps:

```bash
cd TodoListApi

# Build image and run
docker-compose up -d --build

Swagger UI: http://localhost:5266/index.html
# Note: If you cannot access Swagger UI, try using a private/incognito browser window. Some browsers may cache old responses or have CORS issues.
```

# 2. 💻 TodoListUi (Frontend)

To run the frontend UI, follow these steps:

### Build and run with Docker

```bash
cd TodoListUi

# Build image
docker-compose up -d
```

> Access app at http://localhost:3000
