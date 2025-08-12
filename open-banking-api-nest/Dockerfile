# Estágio de construção
FROM node:22-alpine AS builder

WORKDIR /app

# Instala as dependências globais necessárias
RUN apk add --no-cache python3 make g++

# Copia os arquivos de configuração
COPY package.json yarn.lock tsconfig.json nest-cli.json ./

# Instala as dependências com Yarn
RUN yarn config set ignore-engines true && \
    yarn install --frozen-lockfile --network-timeout 1000000

# Copia o resto da aplicação
COPY . .

# Verifica a estrutura antes do build
RUN ls -la src/users/entities/ && \
    ls -la src/config/

# Build da aplicação
RUN yarn build

# Estágio de produção
FROM node:22-alpine

WORKDIR /app

# Copia os arquivos necessários do estágio builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./

# Expõe a porta e inicia a aplicação
EXPOSE 3000
CMD ["yarn", "start:prod"]