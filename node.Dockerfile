FROM node:bullseye

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000