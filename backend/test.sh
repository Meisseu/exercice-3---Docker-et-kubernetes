#!/bin/bash

echo "Running API Tests..."
curl -X POST -H "Content-Type: application/json" -d '{"name":"Test Product", "price":100, "stock":10}' http://localhost:5000/api/products
curl -X GET http://localhost:5000/api/products
