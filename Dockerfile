FROM node:16-buster

WORKDIR /usr/local/app

COPY ./package*.json ./
RUN npm install

COPY ./extensions .

CMD ["npm", "run", "start:docker"]


