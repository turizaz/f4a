FROM node:latest
WORKDIR /app
COPY ./package.json .
RUN npm i && npm i --save-dev
RUN npm i -g mocha && npm i -g knex && npm install -g typescript @types/node ts-node
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]
