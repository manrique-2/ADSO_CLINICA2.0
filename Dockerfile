# Etapa 1: Construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package.json y lockfile lol
# Copiar archivos de dependencias
COPY package*.json ./

# Evitar que Puppeteer descargue Chromium durante el build; usaremos el Chromium del sistema en runtime
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Configuración robusta para instalación
RUN npm config set registry https://registry.npmjs.org/ \
  && npm config set fetch-retries 5 \
  && npm config set fetch-retry-mintimeout 20000 \
  && npm config set fetch-retry-maxtimeout 120000 \
  && npm install

# Copiar todo el proyecto y compilar
COPY . .
RUN npm run build

# ================================
# Etapa 2: Producción con Puppeteer
# ================================
FROM node:18-alpine AS runner

# Instalar Chromium y dependencias requeridas por Puppeteer
RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont \
  bash \
  udev

# Definir ruta del ejecutable Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

# Asegurar que exista un binario accesible en /usr/bin/chromium (algunas versiones de Alpine crean /usr/bin/chromium-browser)
RUN if [ -f /usr/bin/chromium-browser ]; then \
      ln -sf /usr/bin/chromium-browser /usr/bin/chromium; \
    elif [ -f /usr/bin/chromium ]; then \
      ln -sf /usr/bin/chromium /usr/bin/chromium-browser; \
    fi

# Copiar archivos necesarios desde el builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/tsconfig.json ./tsconfig.json

EXPOSE 3000

CMD ["npx", "next", "start"]
