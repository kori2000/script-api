build:
	docker-compose build
up:
	docker-compose up -d
	sleep 1
	docker logs script-api
down:
	docker-compose down