const defer = require('config/defer').deferConfig;
const path = require('path');

export default {
  mongoose: {
    // uri: process.env.MONGO_URI || 'mongodb://mongo:27017/dev',
    uri: 'mongodb://rossinant:Stalker03@ds141674.mlab.com:41674/f4e',
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
    host: process.env.POSTGRES_HOST || 'localhost',
    user: process.env.POSTGRES_USER || 'postgres',
    database: process.env.POSTGRES_DB || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'pass',
    port: process.env.POSTGRES_PORT || 5432,
  },
  crypto: {
    hash: {
      length: 128,
      iterations: process.env.NODE_ENV === 'production' ? 12000 : 1,
    },
  },
  port: 5000,
  secret: ['4692800310'],
  template: {
    root: defer(function(cfg) {
      return path.join(cfg.root, 'templates');
    }),
  },
  root: process.cwd(),
};
