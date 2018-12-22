# exercise-dependency-web

[![Build Status](https://travis-ci.org/JosephMart/exercise-dependency-web.svg?branch=master)](https://travis-ci.org/JosephMart/exercise-dependency-web)

Contains the source code for the thesis completed under Dr. Philip B. Yasskin

## Dev Setup

```shell
docker-compose -f docker-compose-dev.yml run users python manage.py # list commands for users flask cli
docker-compose -f docker-compose-dev.yml run users python manage.py seed-db # example of cli command (seed the user db)
docker-compose -f docker-compose-dev.yml run users flake8 project # code quality with flake8 for users
docker-compose -f docker-compose-dev.yml run exercises python manage.py # list commands for exercises flask cli
docker-compose -f docker-compose-dev.yml run exercises python manage.py seed-db # example of cli command (seed the exercises db)
docker-compose -f docker-compose-dev.yml run exercises flake8 project # code quality with flake8 for project
docker-compose -f docker-compose-dev.yml build # build
docker-compose -f docker-compose-dev.yml up -d # bring up
docker-compose -f docker-compose-dev.yml logs # view logs
```

## Documentation

* [Neo4j Python Driver](https://neo4j.com/docs/api/python-driver/current/)
