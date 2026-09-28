FROM node:20-alpine

# Definir directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar configuración de paquetes
COPY package.json ./

# Copiar todo el código fuente del proyecto
COPY . .

# Exponer el puerto por defecto (Railway asignará el suyo dinámicamente vía process.env.PORT)
ENV PORT=3000
EXPOSE 3000

# Comando de inicio del servidor
CMD ["node", "server.js"]
