const defer = require('config/defer').deferConfig;
const path = require('path');

module.exports = {
  mongoose: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/dev',
    options: {
      server: {
        socketOptions: {
          keepAlive: 1,
        },
        poolSize: 5,
      },
    },
  },
  postgres: {
    host: 'localhost',
    user: 'postgres',
    database: 'postgres',
    password: 'pass',
    port: 5432,
  },
  crypto: {
    hash: {
      length: 128,
      iterations: process.env.NODE_ENV === 'production' ? 12000 : 1,
    },
  },
  port: 3000,
  secret: ['4692800310'],
  template: {
    root: defer(function(cfg) {
      return path.join(cfg.root, 'templates');
    }),
  },
  root: process.cwd(),
};
