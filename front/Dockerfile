FROM node:alpine as build

ARG API_SERVICE_URL
ARG CURRENT_YEAR

ENV API_SERVICE_URL=$API_SERVICE_URL
ENV CURRENT_YEAR=$CURRENT_YEAR

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . ./

RUN npm run build

FROM nginx:latest

COPY --from=build /app/dist/ /usr/share/nginx/html
