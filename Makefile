build:
	docker-compose build
up:
	docker-compose up -d
	sleep 1
	docker logs scrip-api
down:
	docker-compose down