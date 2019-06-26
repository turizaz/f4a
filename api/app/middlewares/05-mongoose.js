import config from '../config'
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(config.mongoose.uri,
    {useNewUrlParser: true, useCreateIndex: true});


exports.init = (app) => app.use(async (ctx, next) => {
  ctx.mongoose = mongoose;
  await next();
});

