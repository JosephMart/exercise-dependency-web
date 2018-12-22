#!/bin/sh

echo "Waiting for neo4j..."

while ! nc -z exercises-db 7687; do
  sleep 0.1
done

echo "Neo4j started"

gunicorn -b 0.0.0.0:5000 manage:app
