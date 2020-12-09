FROM node:latest

COPY ./ /usr/local/imagesUrl
WORKDIR /usr/local/imagesUrl
RUN yarn
RUN yarn build
EXPOSE 4399

RUN npm install -g pm2@latest
CMD ["pm2-runtime","start","/usr/local/imagesUrl/dist/main.js","-i","4", "--watch", "--name", "kiny"]

