#!/bin/bash

docker network create backend-test-network
docker run -d --name db-container --network backend-test-network --network-alias db-container mongo 4.4
docker build -t express-project .
docker run -d --name express-app --network backend-test-network -p 5000:5000 express-project
