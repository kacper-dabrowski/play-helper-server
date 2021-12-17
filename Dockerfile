FROM node:14

WORKDIR /app

COPY package.json . 

RUN npm install

RUN npm i -g nest

COPY . .

EXPOSE 3001

CMD ["npm","run","start:dev"]