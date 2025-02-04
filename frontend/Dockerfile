
# Stage 1: build

## select image
FROM node:22 AS build

## set workdir
WORKDIR /app

## copy info
COPY package.json package-lock.json

COPY . .

RUN npm run build

# Stage2: serve

## select image
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80