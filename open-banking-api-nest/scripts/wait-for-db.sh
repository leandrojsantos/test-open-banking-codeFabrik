#!/bin/sh
set -e

host="$1"
user="$2"
db="$3"
shift 3

max_attempts=30
attempt=1

until pg_isready -h "$host" -U "$user" -d "$db" || [ $attempt -ge $max_attempts ]; do
  echo "($attempt/$max_attempts) PostgreSQL não disponível - aguardando..."
  sleep 2
  attempt=$((attempt+1))
done

if ! pg_isready -h "$host" -U "$user" -d "$db"; then
  echo "PostgreSQL não ficou disponível após $max_attempts tentativas"
  exit 1
fi

exec "$@"