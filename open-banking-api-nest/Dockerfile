# Estágio de construção
FROM node:22-alpine AS builder

WORKDIR /app

# Instala dependências de compilação
RUN apk add --no-cache python3 make g++ curl

# Copia arquivos de configuração
COPY package.json yarn.lock tsconfig.json tsconfig.build.json nest-cli.json ./

# Instala dependências
RUN yarn install --frozen-lockfile

# Copia o restante do código
COPY src ./src
COPY .env* ./ 
RUN if [ ! -f .env ]; then \
    echo "WARNING: .env file not found, using .env.example"; \
    cp .env.example .env 2>/dev/null || touch .env; \
    fi

# Build da aplicação
RUN yarn build

# Estágio de produção
FROM node:22-alpine

WORKDIR /app

# Copia apenas o necessário
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env ./

EXPOSE 3000
CMD ["yarn", "start:prod"]