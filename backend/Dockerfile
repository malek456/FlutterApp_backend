# Utiliser l'image de base Node.js
FROM node:16.16.0

# Définir le répertoire de travail dans le conteneur
WORKDIR /app/Flutter_backend

# Copier package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

COPY package*.json ./
RUN npm install

# Rebuild bcrypt to match the Docker container's architecture
RUN npm rebuild bcrypt --build-from-source

# Copier le reste de l'application
COPY . .

# Exposer le port sur lequel l'application écoute
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["node", "server.js"]
