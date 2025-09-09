# Imagen base
FROM node:20-alpine AS base

# Etapa de dependencias
FROM base AS deps
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package.json package-lock.json ./

# Instalar dependencias con npm
RUN npm ci

# Etapa de build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=http://localhost:3003

# Build de la aplicación Next.js
RUN npm run build

# Imagen final para producción
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Crear usuario no root
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Copiar archivos necesarios
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Ejecutar el servidor Next.js standalone
CMD ["node", "server.js"]
