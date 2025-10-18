# ===== be ==== 
ASPNETCORE_ENVIRONMENT=Production # or Development

BACKEND_PORT=5366
JWT_KEY=8541a2951085f053cec0a6f168bf6ad284262804f87370e711bf6476d3dc0f35
JWT_ISSUER=todolistapi
JWT_AUDIENCE=todolistapi_users
JWT_EXPIRATION_HOURS=24

# Mysql
DB_SERVER=localhost
DB_PORT=2000
DB_NAME=todolistdb
DB_USER=root
DB_PASSWORD=1gxVHbFADLlextz5

# Migration control
AUTO_MIGRATE=true  # Set to true only when deploying new version