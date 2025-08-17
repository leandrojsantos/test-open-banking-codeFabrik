# =============================================
# ESTÁGIO DE CONSTRUÇÃO (builder)
# =============================================
FROM node:22-alpine AS builder

WORKDIR /app

# 1. Instala dependências
RUN apk add --no-cache python3 make g++ postgresql-client git

# 2. Copia arquivos de configuração
COPY package.json yarn.lock tsconfig.json tsconfig.build.json nest-cli.json ormconfig.js ormconfig.ts ./

# 3. Cria .env com valores padrão
RUN touch .env && \
    echo "DB_HOST=db" >> .env && \
    echo "DB_PORT=5432" >> .env && \
    echo "DB_USER=postgres" >> .env && \
    echo "DB_PASSWORD=senhasegura" >> .env && \
    echo "DB_NAME=open_banking" >> .env

# 4. Instala dependências
RUN yarn install --frozen-lockfile --network-timeout 1000000

# 5. Copia TODO o código fonte (incluindo scripts)
COPY . .

# 6. Garante permissões e existencia dos scripts
RUN mkdir -p scripts && \
    if [ ! -f "./scripts/wait-for-db" ]; then \
    echo "#!/bin/sh" > ./scripts/wait-for-db && \
    echo "echo 'Script wait-for-db não encontrado, usando placeholder'" >> ./scripts/wait-for-db && \
    echo "sleep 10" >> ./scripts/wait-for-db && \
    echo "exec \"\$@\"" >> ./scripts/wait-for-db; \
    fi && \
    chmod +x ./scripts/wait-for-db

# 7. Build da aplicação
RUN yarn build && \
    mkdir -p dist/migrations dist/scripts && \
    ([ -d "migrations" ] && cp -r migrations/* dist/migrations/ || true) && \
    cp scripts/* dist/scripts/ && \
    cp ormconfig.js dist/

# =============================================
# ESTÁGIO DE PRODUÇÃO
# =============================================
FROM node:22-alpine

WORKDIR /app

# 8. Configuração do container
RUN apk add --no-cache postgresql-client bash curl

# 9. Copia artefatos do builder (incluindo todos os scripts)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env ./
COPY --from=builder /app/dist/ormconfig.js ./
COPY --from=builder /app/dist/scripts/ ./scripts/

# 10. Configuração final (com verificação de arquivos)
RUN if [ -f "/app/scripts/wait-for-db" ]; then \
    chmod +x /app/scripts/wait-for-db && \
    echo "Script wait-for-db configurado com sucesso"; \
    else \
    echo "Criando wait-for-db alternativo" && \
    echo '#!/bin/sh\necho "Script wait-for-db não encontrado, continuando..."\nsleep 2\nexec "$@"' > /app/scripts/wait-for-db && \
    chmod +x /app/scripts/wait-for-db; \
    fi && \
    chown -R node:node /app

USER node

# 11. Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
    CMD curl -f http://localhost:3000/api/v1/health || exit 1

EXPOSE 3000

# 12. Comando de inicialização robusto
CMD ["sh", "-c", "/app/scripts/wait-for-db db ${DB_USER:-postgres} ${DB_NAME:-open_banking} && node /app/scripts/run-migrations.js && node /app/dist/src/main.js"]