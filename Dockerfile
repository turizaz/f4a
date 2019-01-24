FROM node:latest

RUN mkdir /src

RUN npm install nodemon@latest -g
RUN npm i mocha -g

WORKDIR /src
ADD app/package.json /src/package.json
RUN npm install

ADD app/nodemon.json /src/nodemon.json

ADD run.sh /src/run.sh

EXPOSE 3000

RUN chmod +x /src/run.sh

CMD [ "/bin/sh", "/src/run.sh" ]