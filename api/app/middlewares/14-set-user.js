const jwtDecode = require('jwt-decode');

exports.init = (app) => app.use(async (ctx, next) => {
  if (ctx.request.header.authorization) {
    ctx.user = jwtDecode(ctx.request.header.authorization.split(' ')[1]);
  }
  await next();
});
