# Etapa 1: Construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package.json y lockfile
COPY package*.json ./

RUN npm config set registry https://registry.npmjs.org/ \
    && npm config set fetch-retries 5 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente
COPY . .

# Build de la app
RUN npm run build

# Etapa 2: Imagen liviana para producción
FROM node:18-alpine AS runner

WORKDIR /app

# Solo copiar lo necesario desde el builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

# (Opcional) Si usas TypeScript:
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Exponer el puerto por defecto de Next.js
EXPOSE 3000

# Iniciar la aplicación Next.js
CMD ["npx", "next", "start"]
