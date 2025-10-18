🚀 How to Run Docker for Each Project

```bash
# Tạo .env mới từ .env.be và .env.fe
rm -f .env
cat .env.be .env.fe > .env

# Copy vào folders
cp .env.fe ./ui/.env
cp .env.be ./api/.env
## Build & Run
docker compose up -d --build

```

### For Any Issue

```bash
# Stop và xóa containers, networks, volumes của project này
docker compose down -v

# Xóa containers nếu còn sót
docker rm -f todolist_mysql todolist_backend todolist_frontend 2>/dev/null

# Xóa volumes cụ thể
docker volume rm todolistapi_mysql_data 2>/dev/null

# Xóa network cụ thể
docker network rm todolistapi_network 2>/dev/null

```

## Rebuild From Scratch

```bash
# Cleanup + rebuild
docker compose down -v && \
docker rm -f todolist_mysql todolist_backend todolist_frontend 2>/dev/null && \
docker volume rm todolistapi_mysql_data 2>/dev/null && \
docker compose up -d --build
```
