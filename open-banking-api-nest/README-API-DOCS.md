<h1 align="center">
    <a href="#" alt=""> Documentação da Api </a>
</h1>

<h4 align="center">
	🚧 Em produção 🚧
</h4>

<p align="center">
 <a href="#funcionalidades">Funcionalidades</a> • 
 <a href="#pré-requisitos">Pré-requisitos</a> •
 <a href="#rodando-o-projeto">Rodando o back-end</a> •
 <a href="#testes">Testes</a> •
 <a href="#tecnologias">Tecnologias</a> •
 <a href="#anexos">Anexos</a>
</p>

## Funcionalidades
- [ ] 


## Rodando o projeto
```bash



```

## Tecnologias
As seguintes ferramentas foram usadas:
- 

## Anexos
Documentação para auxiliar:
* ...

# Open Banking App

Uma API moderna para Open Banking construída com NestJS, PostgreSQL e Docker.

## Recursos

- Autenticação JWT
- Documentação Swagger
- Testes abrangentes
- Pronto para Docker

## 💻 Pré-requisitos
Deve ter instalado em sua máquina: 
- Node.js 18+
- Docker 20+
- PostgreSQL 15+

## Testes
```bash

# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov

```

open-banking-api-nest/
├── .docker/
├── .github/
│   └── workflows/
│       ├── ci.yml          # Pipeline de CI
│       └── cd.yml          # Pipeline de CD
├── src/
│   ├── auth/               # Módulo de autenticação
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   │   └── local.strategy.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   └── interfaces/
│   │       └── jwt-payload.interface.ts
│   ├── accounts/           # Módulo de contas bancárias
│   │   ├── dto/
│   │   │   ├── create-account.dto.ts
│   │   │   └── update-account.dto.ts
│   │   ├── entities/
│   │   │   └── account.entity.ts
│   │   ├── accounts.controller.ts
│   │   ├── accounts.module.ts
│   │   ├── accounts.service.ts
│   │   └── accounts.repository.ts
│   ├── transactions/       # Módulo de transações
│   │   ├── dto/
│   │   │   ├── create-transaction.dto.ts
│   │   │   └── transfer.dto.ts
│   │   ├── entities/
│   │   │   └── transaction.entity.ts
│   │   ├── transactions.controller.ts
│   │   ├── transactions.module.ts
│   │   ├── transactions.service.ts
│   │   └── transactions.repository.ts
│   ├── users/              # Módulo de usuários
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   ├── login-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   ├── users.service.ts
│   │   └── users.repository.ts
│   ├── common/             # Utilitários compartilhados
│   │   ├── decorators/
│   │   │   ├── roles.decorator.ts
│   │   │   └── current-user.decorator.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── guards/
│   │   │   └── roles.guard.ts
│   │   ├── interceptors/
│   │   │   └── transform.interceptor.ts
│   │   └── utils/
│   │       └── api-response.util.ts
│   ├── config/             # Configurações
│   │   ├── app.config.ts
│   │   ├── database.config.ts
│   │   ├── swagger.config.ts
│   │   └── validation.config.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/                   # Testes
│   ├── auth/
│   │   ├── auth.controller.spec.ts
│   │   └── auth.service.spec.ts
│   ├── accounts/
│   │   ├── accounts.controller.spec.ts
│   │   └── accounts.service.spec.ts
│   ├── transactions/
│   │   ├── transactions.controller.spec.ts
│   │   └── transactions.service.spec.ts
│   ├── users/
│   │   ├── users.controller.spec.ts
│   │   └── users.service.spec.ts
│   └── app.e2e-spec.ts
├── migrations/             # Migrações do TypeORM
│   └── 123456789-create-tables.ts
├── .env.example
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── docker-compose.yml
├── Dockerfile
├── jest.config.js
├── nest-cli.json
├── package.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json