FROM node:latest

WORKDIR /usr/local/imagesUrl
COPY node_modules dist /
RUN npm install -g pm2@latest
RUN pm2 start ./dist/main.js
