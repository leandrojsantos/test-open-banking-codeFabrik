# =============================================
# 🏗️ ESTÁGIO DE CONSTRUÇÃO (builder)
# =============================================
FROM node:20-alpine AS builder

WORKDIR /app

# 1️⃣ Copia arquivos de configuração e instala dependências
COPY package.json yarn.lock tsconfig.json nest-cli.json ./

# 2️⃣ Instala dependências de build
RUN apk add --no-cache python3 make g++ postgresql-client git

# 3️⃣ Instala dependências do projeto
RUN yarn install --frozen-lockfile --network-timeout 1000000

# 4️⃣ Copia todo o código fonte
COPY . .

# 5️⃣ Configura script wait-for-db (opcional)
RUN mkdir -p scripts && \
    echo '#!/bin/sh' > ./scripts/wait-for-db && \
    echo 'echo "PostgreSQL está pronto!"' >> ./scripts/wait-for-db && \
    echo 'exec "$@"' >> ./scripts/wait-for-db && \
    chmod +x ./scripts/wait-for-db

# 6️⃣ Build da aplicação
RUN yarn build && \
    mkdir -p dist/migrations && \
    cp -r migrations/* dist/migrations/ 2>/dev/null || :

# =============================================
# 🚀 ESTÁGIO DE PRODUÇÃO
# =============================================
FROM node:20-alpine

WORKDIR /app

# 7️⃣ Instala dependências de runtime
RUN apk add --no-cache postgresql-client bash curl

# 8️⃣ Copia artefatos do builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/scripts ./scripts/

# 9️⃣ Configura permissões
RUN chmod +x /app/scripts/wait-for-db && \
    chown -R node:node /app

USER node

# 🔟 Variáveis de ambiente
ENV NODE_ENV=development \
    PORT=3000 \
    DB_HOST=db \
    DB_PORT=5432 \
    DB_USER=postgres \
    DB_PASSWORD=senhasegura \
    DB_NAME=open_banking \
    CORS_ORIGIN=* \
    API_PREFIX=api/v1

EXPOSE 3000

# 🏁 Comando de inicialização
CMD ["sh", "-c", "/app/scripts/wait-for-db && node /app/dist/src/main.js"]