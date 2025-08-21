CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]