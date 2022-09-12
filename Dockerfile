FROM node:12

EXPOSE 3000

WORKDIR /app

ADD . .

RUN npm install -g nodemon && npm install && npm cache clean --force

CMD ["npm","start"]