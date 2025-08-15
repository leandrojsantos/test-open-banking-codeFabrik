# =============================================
# ESTÁGIO DE CONSTRUÇÃO (builder)
# =============================================
FROM node:22-alpine AS builder

WORKDIR /app

# 1. Instala dependências
RUN apk add --no-cache python3 make g++ postgresql-client git

# 2. Copia arquivos de configuração
COPY package.json yarn.lock tsconfig.json tsconfig.build.json nest-cli.json ormconfig.js ormconfig.ts ./

# 3. Cria .env vazio se não existir
RUN touch .env && \
    echo "# Arquivo de ambiente gerado automaticamente" >> .env && \
    echo "DB_HOST=db" >> .env && \
    echo "DB_PORT=5432" >> .env && \
    echo "DB_USER=postgres" >> .env && \
    echo "DB_PASSWORD=senhasegura" >> .env && \
    echo "DB_NAME=open_banking" >> .env

# 4. Cópia condicional de migrações
RUN mkdir -p migrations && \
    if [ -n "$(ls -A ./migrations 2>/dev/null)" ]; then \
    cp -r ./migrations/* ./migrations/; \
    fi

# 5. Instala dependências
RUN yarn install --frozen-lockfile --network-timeout 1000000

# 6. Copia todo o código e scripts
COPY . .
COPY scripts/run-migrations.js ./scripts/

# 7. Build da aplicação
RUN yarn build && \
    mkdir -p dist/migrations && \
    if [ -n "$(ls -A migrations 2>/dev/null)" ]; then \
    cp -r migrations/* dist/migrations/; \
    fi && \
    cp ormconfig.js dist/ && \
    cp .env dist/ && \
    mkdir -p dist/scripts && \
    cp scripts/run-migrations.js dist/scripts/

# =============================================
# ESTÁGIO DE PRODUÇÃO
# =============================================
FROM node:22-alpine

WORKDIR /app

# 8. Configuração do container
RUN apk add --no-cache postgresql-client bash curl

# 9. Copia artefatos do builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist/.env ./
COPY --from=builder /app/dist/ormconfig.js ./
COPY --from=builder /app/dist/scripts/run-migrations.js ./scripts/

# 10. Configura entrypoint e permissões
RUN chmod +x /app/scripts/run-migrations.js && \
    chown -R node:node /app

USER node

# 11. Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
    CMD curl -f http://localhost:3000/api/v1/health || exit 1

EXPOSE 3000
CMD ["node", "scripts/run-migrations.js"]