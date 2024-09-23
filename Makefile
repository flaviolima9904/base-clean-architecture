help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Instal node dependencies
	yarn install

local: ## Start app local development
	yarn run start:dev

format: ## Format with prettier
	yarn run format

lint: install
	yarn run lint

test: install
	yarn test

create-network: ## Create network for project on docker
	docker network create --driver bridge truckme-network || true

start-docker: ## Start project containers
	docker-compose -f docker-compose.yml start

stop-docker: ## Stop project containers
	docker-compose -f docker-compose.yml stop 

down-docker: ## Down project containers
	docker-compose -f docker-compose.yml  down 

run-docker-prod: create-network ## Build and start apllication PROD container
	docker-compose -f docker-compose.yml up -d --build app-prod
