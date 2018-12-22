# exercise-dependency-web

Contains the source code for the thesis completed under Dr. Philip B. Yasskin

## Dev Setup

```shell
docker-compose -f docker-compose-dev.yml run users python manage.py # list commands for users flask cli
docker-compose -f docker-compose-dev.yml run users python manage.py seed-db # example of cli command (seed the db)
docker-compose -f docker-compose-dev.yml build # build
docker-compose -f docker-compose-dev.yml up -d # bring up
docker-compose -f docker-compose-dev.yml logs # view logs
docker-compose -f docker-compose-dev.yml run users flake8 project # code quality with flake8
```
