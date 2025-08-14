# =============================================
# ESTÁGIO DE CONSTRUÇÃO (builder)
# =============================================
FROM node:22-alpine AS builder

WORKDIR /app

# 1. Instala dependências
RUN apk add --no-cache python3 make g++ postgresql-client

# 2. Copia arquivos de configuração
COPY package.json yarn.lock tsconfig.json tsconfig.build.json nest-cli.json ./

# 3. Instala dependências
RUN yarn install --frozen-lockfile

# 4. Copia TUDO (incluindo .env e migrations)
COPY . .

# 5. Garante que .env existe (cria vazio se necessário)
RUN if [ ! -f .env ]; then \
    touch .env && \
    echo "WARNING: Arquivo .env vazio criado automaticamente" >&2; \
    fi

# 6. Build da aplicação
RUN yarn build

# =============================================
# ESTÁGIO DE PRODUÇÃO
# =============================================
FROM node:22-alpine

WORKDIR /app

# 7. Instala dependências para operação
RUN apk add --no-cache postgresql-client bash

# 8. Copia artefatos do estágio builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# 9. SOLUÇÃO PRIMÁRIA: Copia .env explicitamente
COPY --from=builder /app/.env ./

# 10. SOLUÇÃO ALTERNATIVA (Se o erro persistir ⚠️)
# RUN touch .env  # Descomente esta linha se a cópia falhar

# 11. Configura entrypoint
COPY scripts/run-migrations.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/run-migrations.sh

EXPOSE 3000
ENTRYPOINT ["run-migrations.sh"]
CMD ["yarn", "start:prod"]