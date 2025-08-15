#!/bin/sh
set -e

host="$1"
user="$2"
db="$3"
shift 3
cmd="$@"

until pg_isready -h "$host" -U "$user" -d "$db"; do
  >&2 echo "PostgreSQL não está disponível - aguardando..."
  sleep 2
done

>&2 echo "PostgreSQL está disponível - executando comando"
exec $cmd