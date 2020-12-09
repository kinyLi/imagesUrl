FROM node:latest

COPY ./ /usr/local/imagesUrl
RUN npm install -g pm2@latest
WORKDIR /usr/local/imagesUrl
RUN yarn
RUN yarn build
EXPOSE 4399

RUN pm2 start /usr/local/imagesUrl/dist/main.js

docker build -t images/url ./

docker run -d -p 4399:4399 --name="kiny-upload" images/url

localhost:4399
