FROM node:latest
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .
COPY ./src/i18n_problem/run_i18n.ts ./src/i18n.ts
CMD ["npm", "run", "start"]
#CMD ["pwd"]