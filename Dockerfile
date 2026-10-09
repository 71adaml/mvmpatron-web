# Stage 1: build the React site into /app/dist
FROM public.ecr.aws/docker/library/node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: install only the server's production dependencies
FROM public.ecr.aws/docker/library/node:22-alpine AS server-deps
WORKDIR /app
COPY server/package.json server/package-lock.json ./
RUN npm ci --omit=dev

# Stage 3: the image that runs in production
FROM public.ecr.aws/docker/library/node:22-alpine
ENV NODE_ENV=production PORT=8080
WORKDIR /app
COPY --from=server-deps /app/node_modules ./node_modules
COPY server/package.json server/server.js ./
COPY --from=build /app/dist ./dist
USER node
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1
CMD ["node", "server.js"]
