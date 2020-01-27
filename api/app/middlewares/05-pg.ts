const client = require('../libs/pg');

exports.init = (app) => app.use(async (ctx, next) => {
  ctx.pg = client;
  await next();
});
