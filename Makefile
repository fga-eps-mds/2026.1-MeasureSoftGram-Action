update-dist:
	npm install
	npm run build

build:
	docker compose up --build

msgram:
	docker exec -it msgram-action act workflow_dispatch \
		-j msgram_job \
		-W .github/workflows/msgram.yml \
		--secret-file /workspace/env-vars/.action.env

test:
	docker exec -it msgram-action act -j pipeline -W .github/workflows/linter.yml

down:
	docker compose down msgram-action

metrics:
	docker exec -it msgram-action act -j release -W .github/workflows/metrics.yml

linter:
	docker exec -it msgram-action act -j ESLint -W .github/workflows/linter.yml
