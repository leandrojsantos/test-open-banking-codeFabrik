# Makefile para automação do projeto Open Banking API

# Cores para output
VERDE=\033[0;32m
AMARELO=\033[1;33m
VERMELHO=\033[0;31m
NC=\033[0m

# Variáveis
DOCKER_COMPOSE = docker compose
PROJECT_LABEL = com.docker.compose.project=open-banking-api
APP_LABEL = app=open-banking
SERVICO_APP = app
SERVICO_DB = db
SCRIPT_MIGRACAO = /app/scripts/run-migrations.js

.PHONY: ajuda verificar-dependencias iniciar limpar construir iniciar-app parar logs migrar verificar-saude verificar-banco testar listar-recursos

ajuda:
	@echo "$(AMARELO)⚙️  Comandos disponíveis:$(NC)"
	@echo "$(VERDE)make verificar-dependencias$(NC) - Verifica dependências"
	@echo "$(VERDE)make listar-recursos$(NC)    - Lista recursos do projeto"
	@echo "$(VERDE)make iniciar$(NC)            - Inicializa o projeto completo"
	@echo "$(VERDE)make limpar$(NC)             - Limpa APENAS recursos do projeto"
	@echo "$(VERDE)make construir$(NC)          - Constrói as imagens Docker"
	@echo "$(VERDE)make start$(NC)              - Inicia a aplicação"
	@echo "$(VERDE)make iniciar-app$(NC)        - Inicia a aplicação"
	@echo "$(VERDE)make parar$(NC)              - Para a aplicação"
	@echo "$(VERDE)make logs$(NC)               - Mostra logs da aplicação"
	@echo "$(VERDE)make migrar$(NC)             - Executa migrações do banco"
	@echo "$(VERDE)make verificar-saude$(NC)    - Verifica saúde da aplicação"
	@echo "$(VERDE)make verificar-banco$(NC)    - Verifica estado do banco"
	@echo "$(VERDE)make testar$(NC)             - Testa endpoints da API"

verificar-dependencias:
	@echo "$(AMARELO)🔍 Verificando dependências...$(NC)"
	@which make >/dev/null && echo "$(VERDE)✅ Make instalado$(NC)" || (echo "$(VERMELHO)❌ Make não instalado$(NC)" && exit 1)
	@which docker >/dev/null && echo "$(VERDE)✅ Docker instalado$(NC)" || (echo "$(VERMELHO)❌ Docker não instalado$(NC)" && exit 1)
	@docker compose version >/dev/null 2>&1 && echo "$(VERDE)✅ Docker Compose instalado$(NC)" || (echo "$(VERMELHO)❌ Docker Compose não instalado$(NC)" && exit 1)
	@echo "$(VERDE)✅ Todas as dependências estão instaladas!$(NC)"

listar-recursos:
	@echo "$(AMARELO)📋 Containers do projeto:$(NC)"
	@docker ps -a --filter "label=${PROJECT_LABEL}" --format "table {{.ID}}\t{{.Names}}\t{{.Status}}\t{{.Ports}}"
	@echo ""
	@echo "$(AMARELO)📦 Imagens do projeto:$(NC)"
	@docker images --filter "label=${PROJECT_LABEL}" --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}\t{{.Size}}"
	@echo ""
	@echo "$(AMARELO)💾 Volumes do projeto:$(NC)"
	@docker volume ls --filter "label=${PROJECT_LABEL}" --format "table {{.Name}}\t{{.Driver}}\t{{.Scope}}"
	@echo ""
	@echo "$(AMARELO)🌐 Networks do projeto:$(NC)"
	@docker network ls --filter "label=${PROJECT_LABEL}" --format "table {{.ID}}\t{{.Name}}\t{{.Driver}}"

start: iniciar-app

iniciar: verificar-dependencias limpar construir iniciar-app migrar
	@echo "$(VERDE)✅ Projeto inicializado com sucesso!$(NC)"
	@echo "$(AMARELO)📚 URLs disponíveis:$(NC)"
	@echo "Swagger UI: http://localhost:3000/api/v1/docs"
	@echo "PGAdmin: http://localhost:5050"
	@echo "Health Check: http://localhost:3000/api/v1/health"

limpar:
	@echo "$(AMARELO)🧹 Removendo APENAS recursos do projeto...$(NC)"
	
	@echo "$(AMARELO)🛑 Parando containers...$(NC)"
	@docker ps -q --filter "label=${PROJECT_LABEL}" | xargs -r docker stop 2>/dev/null || true
	
	@echo "$(AMARELO)🗑️  Removendo containers...$(NC)"
	@docker ps -a -q --filter "label=${PROJECT_LABEL}" | xargs -r docker rm 2>/dev/null || true
	
	@echo "$(AMARELO)🗑️  Removendo imagens...$(NC)"
	@docker images -q --filter "label=${PROJECT_LABEL}" | xargs -r docker rmi -f 2>/dev/null || true
	
	@echo "$(AMARELO)🗑️  Removendo volumes...$(NC)"
	@docker volume ls -q --filter "label=${PROJECT_LABEL}" | xargs -r docker volume rm -f 2>/dev/null || true
	
	@echo "$(AMARELO)🗑️  Removendo networks...$(NC)"
	@docker network ls -q --filter "label=${PROJECT_LABEL}" | xargs -r docker network rm 2>/dev/null || true
	
	@echo "$(AMARELO)🧹 Removendo artefatos do projeto...$(NC)"
	sudo rm -rf dist node_modules yarn.lock package-lock.json .env.local
	@echo "$(VERDE)✅ Limpeza específica do projeto concluída!$(NC)"

dependencias:
	@echo "$(AMARELO)📦 Instalando dependências...$(NC)"
	yarn install
	@echo "$(VERDE)✅ Dependências instaladas!$(NC)"

construir: dependencias
	@echo "$(AMARELO)🏗️  Construindo projeto...$(NC)"
	yarn build
	@echo "$(AMARELO)🐳 Construindo imagens Docker...$(NC)"
	$(DOCKER_COMPOSE) build --no-cache
	@echo "$(VERDE)✅ Build concluído!$(NC)"

iniciar-app:
	@echo "$(AMARELO)🚀 Iniciando aplicação...$(NC)"
	$(DOCKER_COMPOSE) up -d
	@echo "$(VERDE)✅ Aplicação iniciada!$(NC)"
	@echo "$(AMARELO)⏳ Aguardando aplicação ficar disponível...$(NC)"
	sleep 10

parar:
	@echo "$(AMARELO)🛑 Parando aplicação...$(NC)"
	$(DOCKER_COMPOSE) down
	@echo "$(VERDE)✅ Aplicação parada!$(NC)"

logs:
	@echo "$(AMARELO)📋 Mostrando logs...$(NC)"
	$(DOCKER_COMPOSE) logs -f $(SERVICO_APP)

migrar:
	@echo "$(AMARELO)🔄 Verificando script de migração...$(NC)"
	$(DOCKER_COMPOSE) exec $(SERVICO_APP) ls -la /app/scripts/
	@echo "$(AMARELO)🗄️  Executando migrações...$(NC)"
	$(DOCKER_COMPOSE) run --rm $(SERVICO_APP) node $(SCRIPT_MIGRACAO)
	@echo "$(VERDE)✅ Migrações executadas!$(NC)"

verificar-saude:
	@echo "$(AMARELO)❤️  Verificando saúde da aplicação...$(NC)"
	curl -f http://localhost:3000/api/v1/health || \
	(echo "$(VERMELHO)❌ Health check falhou!$(NC)" && exit 1)
	@echo "$(VERDE)✅ Health check OK!$(NC)"

verificar-banco:
	@echo "$(AMARELO)📊 Verificando migrações no banco...$(NC)"
	$(DOCKER_COMPOSE) exec $(SERVICO_DB) psql -U postgres -d open_banking -c "SELECT * FROM migrations;"
	@echo "$(AMARELO)📋 Verificando tabelas...$(NC)"
	$(DOCKER_COMPOSE) exec $(SERVICO_DB) psql -U postgres -d open_banking -c "\dt"

testar: verificar-saude
	@echo "$(AMARELO)🧪 Testando endpoints...$(NC)"
	curl -s http://localhost:3000/api/v1/health | grep -q "status" && \
	echo "$(VERDE)✅ Health endpoint OK!$(NC)" || \
	(echo "$(VERMELHO)❌ Health endpoint falhou!$(NC)" && exit 1)
	@echo "$(VERDE)✅ Todos os testes passaram!$(NC)"