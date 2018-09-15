FROM node:alpine

RUN mkdir /app

WORKDIR /app

ADD . .

RUN npm i --production

EXPOSE 8000

CMD ["node", "app.js"]
