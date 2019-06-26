FROM node:latest
WORKDIR /app
COPY ./package.json .
RUN npm i && npm i -g mocha && npm i -g knex
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]
