<h1 align="center">
    <a href="#" alt=""> Documentação da Api </a>
</h1>

<h4 align="center">
	🚧 Em produção 🚧
</h4>

<p align="center">
 <a href="#funcionalidades">Funcionalidades</a> • 
 <a href="#pré-requisitos">Pré-requisitos</a> •
 <a href="#tecnologias">Tecnologias</a> •
 <a href="#rodando-o-projeto">Rodando o back-end</a> •
 <a href="#testes">Testes</a> •
 <a href="#considerações-finais">Considerações Finais</a> •
 <a href="#anexos">Anexos</a>
</p>

## Funcionalidades
API para sistema de Open Banking desenvolvida com NestJS, PostgreSQL e Docker.
- Autenticação JWT
- Gerenciamento de usuários
- Criação e gerenciamento de contas bancárias
- Realização de transações (depósito, saque, transferência)
- Documentação Swagger integrada

## Pré-requisitos
Deve ter instalado em sua máquina: 
- Node.js 18+
- Docker 20+
- PostgreSQL 15+

## Tecnologias
As seguintes ferramentas foram usadas:
- NestJS
- TypeORM
- PostgreSQL
- Docker
- Swagger
- JWT
- Jest 

## Rodando o projeto
```bash

1. Clone o repositório:
 $ git clone git@github.com:leandrojsantos/test-open-banking-codeFabrik.git
 $ cd open-banking-api-nest

2. Crie um arquivo `.env` baseado no `.env.example`

3. Execute `docker-compose up -d` para subir os containers

4. Execute as migrações: `npm run typeorm migration:run`

5. Escolha uma da versões:
# versão dev
npm install
npm run start:dev

# versão produção
npm run build
npm run start:prod

6. Acesse a documentação da API em: http://localhost:3000/api 
    Swagger UI (Rotas da api): http://localhost:3000/api
    PGAdmin (Banco de dados da api use os dados ".env"): http://localhost:5050

```
## Testes
```bash
# Cobertura de testes em dev
npm test
npm run test:cov 

# Cobertura de testes em produção
npm run build
npm run start:prod

```

## Considerações Finais
Esta implementação segue boas práticas de desenvolvimento como:

1. **Separação de responsabilidades**: 
Cada módulo tem sua pasta com controllers, services, entidades e DTOs organizados.

2. **Segurança**: 
   - Autenticação JWT
   - Senhas hasheadas com bcrypt
   - Validação de dados com class-validator

3. **Documentação**: 
   - Swagger integrado
   - README completo

4. **Testabilidade**: 
   - Módulos independentes
   - Injeção de dependências
   - Configuração do Jest

5. **Escalabilidade**: 
   - Docker para ambiente isolado
   - TypeORM para abstração do banco de dados
   - Configurações centralizadas

6. **Boas práticas de código**: 
   - Tipagem forte
   - Tratamento de erros
   - DTOs para validação
   - Interfaces claras


## Anexos
Documentação para auxiliar:
