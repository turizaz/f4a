FROM node:latest
WORKDIR /app
COPY package.json .
COPY . .
RUN npm i -g typescript ts-node
RUN npm i
CMD ["npm", "run", "ssr"]
