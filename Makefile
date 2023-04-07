.PHONY: up down start stop restart db app

up:
	docker-compose up -d
down:
	docker-compose down
start:
	docker-compose start
stop:
	docker-compose stop
restart:
	docker-compose down
	docker-compose up -d
php:
	docker-compose exec php bash
mysql:
	docker-compose exec mysql bash -c 'mysql -u root -p'
vite:
	cd src && vite