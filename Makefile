update-dist:
	npm ci
	npm run build

build: update-dist
	docker compose up --build

down:
	docker compose down

action-msgram:
	docker exec -it msgram-action act workflow_dispatch \
		-j msgram_job \
		-W .github/workflows/msgram.yml \
		--secret-file /workspace/env-vars/.action.env

action-test:
	docker exec -it msgram-action act -j pipeline -W .github/workflows/linter.yml

action-metrics:
	docker exec -it msgram-action act -j release -W .github/workflows/metrics.yml

action-linter:
	docker exec -it msgram-action act -j ESLint -W .github/workflows/linter.yml
