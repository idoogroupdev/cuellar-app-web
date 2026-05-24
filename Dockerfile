
FROM node:lts-alpine AS builder

WORKDIR /app

ARG API_URL

ENV VITE_API_URL=$API_URL

COPY package*.json ./

RUN npm install -g npm@latest

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx:stable-alpine

WORKDIR /app

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]