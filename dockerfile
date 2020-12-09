FROM node:latest

COPY ./ /usr/local/imagesUrl
RUN npm install -g pm2@latest
RUN cd /usr/local/imagesUrl
RUN yarn
RUN yarn build
RUN pm2 start /usr/local/imagesUrl/dist/main.js

EXPOSE 5700
