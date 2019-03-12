const config = require('config');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
try{
  mongoose.connect(config.mongoose.uri,
    {useNewUrlParser: true, useCreateIndex: true});
}catch (e) {
  console.log(e);
}



exports.init = (app) => app.use(async (ctx, next) => {
  ctx.mongoose = mongoose;
  await next();
});
