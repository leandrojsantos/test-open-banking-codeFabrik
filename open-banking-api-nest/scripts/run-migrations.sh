#!/bin/sh
set -ex

# database
echo "Database..."
until pg_isready -h db -U ${DB_USER:-postgres} -d ${DB_NAME:-open_banking}; do
  sleep 2
done

# Run migrations
echo "Running migrations..."
yarn typeorm migration:run -d dist/ormconfig.js

# Start application
echo "Starting NestJS application..."
exec yarn start:prod