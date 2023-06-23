FROM node:alpine as build

ARG API_SERVICE_URL
ENV API_SERVICE_URL=$API_SERVICE_URL

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . ./

RUN npm run build

FROM nginx:latest

COPY --from=build /app/dist/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
