# Usamos Node como base
FROM node:22-alpine

# Crear carpeta de la app
WORKDIR /app

# Copiar package.json y lock primero (mejora la cache de Docker)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Generar Prisma client (por si no está generado)
RUN npx prisma generate

# Compilar TypeScript a JavaScript
RUN npm run build

# Exponer el puerto 
EXPOSE 4000

# Comando para iniciar
CMD ["npm", "run", "start"]
