FROM node:latest
WORKDIR /app
COPY package.json .
RUN npm i && npm i -g typescript ts-node
COPY ./client /app/client
RUN npm run install:ssr
CMD ["npm", "run", "ssr"]
