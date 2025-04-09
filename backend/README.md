# E-commerce API  

Une API RESTful permettant de gérer des produits, des clients et des commandes.  
Le projet utilise Node.js, Express, MongoDB et Docker.  

---

## Prérequis  

Avant d’utiliser cette application, assure-toi d’avoir installé :  

1. **Git**  
   ```sh
   git --version
   ```
   
2. **Node.js** (version 18+)  
   ```sh
   node -v
   npm -v
   ```
   
3. **Docker Desktop**  
   ```sh
   docker --version
   ```

---

## 1. Cloner le projet  
```sh
git clone https://github.com/Meisseu/ecommerce-api.git
cd ecommerce-api
```

---

## 2. Lancer l’API avec Docker  

### Méthode 1 : Exécuter `run.sh` sous Windows  
Si Git Bash est installé, exécute :  
```sh
bash run.sh
```

Si Git Bash n’est pas installé, utilise la méthode manuelle :  

### Méthode 2 : Lancer les commandes Docker manuellement  
```sh
docker network create backend-test-network
docker run -d --name db-container --network backend-test-network --network-alias db-container mongo:4.4
docker build -t express-project .
docker run -d --name express-app --network backend-test-network -p 5000:5000 express-project
```

Vérifier si l’API fonctionne :  
```sh
docker ps
```
Tu devrais voir deux conteneurs actifs :  
- `express-app` (API)  
- `db-container` (MongoDB)  

---

## 3. Tester l’API  

L’API tourne maintenant sur `http://localhost:5000`.  

### Tester avec `curl`  
```sh
curl -X GET http://localhost:5000/api/products
```

---

## 4. Endpoints de l'API  

### Produits  
| Méthode  | URL | Description |
|----------|-----|-------------|
| `POST`   | `/api/products` | Ajouter un produit |
| `GET`    | `/api/products` | Récupérer tous les produits |
| `GET`    | `/api/products/:id` | Voir un produit |
| `PUT`    | `/api/products/:id` | Modifier un produit |
| `DELETE` | `/api/products/:id` | Supprimer un produit |

### Clients  
| Méthode  | URL | Description |
|----------|-----|-------------|
| `POST`   | `/api/customers` | Ajouter un client |
| `GET`    | `/api/customers` | Voir la liste des clients |

### Commandes  
| Méthode  | URL | Description |
|----------|-----|-------------|
| `POST`   | `/api/orders` | Créer une commande |
| `GET`    | `/api/orders/:id` | Voir une commande |
| `PUT`    | `/api/orders/:id` | Modifier une commande |
| `DELETE` | `/api/orders/:id` | Supprimer une commande |

### Commande Directe  
| Méthode  | URL | Description |
|----------|-----|-------------|
| `POST`   | `/api/orders/direct/:customerId` | Passer une commande pour un client existant |

Exemple de requête `curl` :  
```sh
curl -X POST -H "Content-Type: application/json" -d '{"products":["65a42b1fcf6a1c3d9b654321"]}' http://localhost:5000/api/orders/direct/65a42b1fcf6a1c3d9b123456
```
Réponse attendue :  
```json
{
    "message": "Order created successfully",
    "order": {
        "_id": "65a42b1fcf6a1c3d9b999999",
        "customer": "65a42b1fcf6a1c3d9b123456",
        "products": ["65a42b1fcf6a1c3d9b654321"]
    }
}
```

---

## 5. Arrêter et nettoyer Docker  

### Arrêter les conteneurs  
```sh
docker stop express-app db-container
```

### Supprimer les conteneurs et le réseau  
```sh
docker rm express-app db-container
docker network rm backend-test-network
```
