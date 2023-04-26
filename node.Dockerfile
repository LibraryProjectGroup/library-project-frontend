FROM node:bullseye

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

WORKDIR /app

COPY . .

RUN npm install
RUN npm install -g serve

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build"]
