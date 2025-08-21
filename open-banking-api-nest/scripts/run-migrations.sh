#!/bin/sh
set -ex

# 1. Database
echo "Database..."
until pg_isready -h db -U ${DB_USER:-postgres} -d ${DB_NAME:-open_banking}; do
  sleep 2
done

# 2. Executa migrações
echo "Running migrations..."
node /app/scripts/run-migrations.js

# 3. Inicia a aplicação
echo "Starting NestJS application..."
exec yarn start:prod

