FROM node:latest
WORKDIR /app
COPY ./package.json .
RUN npm i
RUN npm i -g mocha
COPY . .
CMD ["npm", "run", "start"]
