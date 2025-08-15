import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const setupSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('Open Banking API')
        .setDescription('API for Open Banking application in NestJS')
        .setVersion('1.0')
        .addBearerAuth(
            { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
            'JWT',
        )
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
};


/**
 * ## Variáveis de Ambiente

| Variável | Descrição | Valor Padrão |
|----------|-----------|--------------|
| PORT | Porta da aplicação | 3000 |
| DB_HOST | Host do PostgreSQL | db |
| DB_PORT | Porta do PostgreSQL | 5432 |
| DB_USER | Usuário do PostgreSQL | postgres |
| DB_PASSWORD | Senha do PostgreSQL | postgres |
| DB_NAME | Nome do banco de dados | open_banking |
| JWT_SECRET | Segredo para JWT | - |
| JWT_EXPIRATION | Expiração do token JWT | 1d |

## Rotas Principais

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /users | Criar novo usuário |
| POST | /auth/login | Login do usuário |
| POST | /accounts | Criar nova conta |
| GET | /accounts | Listar contas do usuário |
| POST | /transactions | Criar transação |
| POST | /transactions/transfer | Realizar transferência |

## Estrutura do Projeto
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


 */