#!/bin/bash

# Configuração de logs
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Configura paths
export NODE_PATH=./dist

# Registra path aliases
yarn add -D tsconfig-paths

# 1. Espera o PostgreSQL ficar pronto
log "🔎 Verificando conexão com PostgreSQL..."
until pg_isready -h db -U ${DB_USER} -d ${DB_NAME} -t 10; do
  log "🕒 Aguardando PostgreSQL... (Host: db, User: ${DB_USER}, DB: ${DB_NAME})"
  sleep 5
done

# 2. Executa migrations
log "🔄 Executando migrations..."
yarn typeorm migration:run -d dist/src/data-source.js

# 3. Inicia a aplicação
log "🚀 Iniciando aplicação NestJS..."
exec "$@"