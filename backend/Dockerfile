# ========= Stage 1: Build TS =========
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build 

# ========= Stage 2: Run app =========
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm install --omit=dev

# if .env exists, copy
COPY .env .env

EXPOSE 3000
CMD ["node", "dist/index.js"]
