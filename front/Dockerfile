FROM node:alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . ./

RUN npm run build

FROM nginx:latest

COPY --from=build /app/dist/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
