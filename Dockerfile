# Stage 1: Build
FROM node:22 AS builder
WORKDIR /app

# Kopiujemy wszystko
COPY . ./

# Budujemy frontend (jeśli istnieje)
RUN if [ -f package.json ]; then npm install && npm run build; fi

# Instalujemy zależności serwera
WORKDIR /app/server
RUN npm install

# Stage 2: Final Image
FROM node:22-slim
WORKDIR /app

# Kopiujemy zainstalowany serwer z Stage 1
# Upewnij się, że server.js jest w folderze /app/server w Stage 1
COPY --from=builder /app/server ./

# Kopiujemy zbudowany frontend
COPY --from=builder /app/dist ./dist

# WAŻNE: Cloud Run używa portu 8080
ENV PORT=8080
EXPOSE 8080

# Uruchamiamy serwer
CMD ["node", "server.js"]
# Stage 2: Final Image
FROM node:22-slim
WORKDIR /app

# Kopiujemy zainstalowany serwer
COPY --from=builder /app/server ./

# Kopiujemy zbudowany frontend (pliki JS/CSS)
COPY --from=builder /app/dist ./dist

# --- KLUCZOWA POPRAWKA ---
# Kopiujemy folder public, aby obrazy były fizycznie w kontenerze
COPY --from=builder /app/public ./public
# -------------------------

ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]