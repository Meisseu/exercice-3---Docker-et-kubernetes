# 🚀 Projet MERN – Déploiement avec Docker (sans Docker Compose)

Ce projet est une application MERN (MongoDB, Express, React, Node.js) entièrement conteneurisée à l’aide de Docker, sans utiliser `docker-compose`.  
Il inclut une API Express, un frontend React et une base de données MongoDB.

---

## 📦 Prérequis

Assure-toi d’avoir installé :

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) (avec Docker Desktop)

---

## 📁 Structure du projet

```
.
├── backend/              # Backend Express
│   ├── Dockerfile
│   ├── .env
│   └── ...
├── frontend/             # Frontend React
│   ├── Dockerfile
│   ├── .env
│   └── ...
```

---

## 🔧 Étapes de containerisation

### 🧱 1. Créer le réseau Docker

```sh
docker network create backend-test-network
```

---

### 🗃️ 2. Lancer MongoDB avec volume

```sh
docker volume create mongo-data

docker run -d \
  --name db-container \
  --network backend-test-network \
  --network-alias mongo \
  -v mongo-data:/data/db \
  mongo:4.4
```

---

### 🚀 3. Conteneuriser le backend (Express)

#### 📁 `backend/Dockerfile`

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

#### 📄 `backend/.env`

```env
MONGO_URI=mongodb://mongo:27017/ecommerce
PORT=5000
```

#### 🔨 Build & run

```sh
cd backend
docker build -t ecommerce-backend .
docker run -d \
  --name express-app \
  --network backend-test-network \
  -p 5000:5000 \
  --env-file .env \
  ecommerce-backend
```

---

### 💻 4. Conteneuriser le frontend (React)

#### 📁 `frontend/Dockerfile`

```dockerfile
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

#### 📄 `frontend/.env`

```env
VITE_API_URL=http://localhost:5000
PORT=3000
```

> 🔁 Utilise `import.meta.env.VITE_API_URL` pour les appels API dans ton code React

#### 🔨 Build & run

```sh
cd frontend
docker build -t ecommerce-frontend .
docker run -d \
  --name frontend-app \
  --network backend-test-network \
  -p 3000:80 \
  ecommerce-frontend
```

---

## ✅ Résultat final

| Composant  | URL                           |
|------------|-------------------------------|
| API        | http://localhost:5000         |
| Frontend   | http://localhost:3000         |
| MongoDB    | Accès interne via `mongo:27017` |

---

## 🧹 Nettoyer les conteneurs et volumes

```sh
docker stop express-app db-container frontend-app
docker rm express-app db-container frontend-app
docker volume rm mongo-data
docker network rm backend-test-network
```

---

## 🛠️ Astuce `.dockerignore` (à placer dans `backend/` et `frontend/`)

```
node_modules
.git
.vscode
.DS_Store
*.log
build
dist
```

