// const session = require('koa-session');
// const MongooseStore = require('koa-session-mongoose');
// const convert = require('koa-convert');
//
// exports.init = (app) => app.use(convert(session({
//   key: 'sid',
//   cookie: {
//     httpOnly: true,
//     path: '/',
//     overwrite: true,
//     signed: false, // by default true (not needed here)
//     maxAge: 3600 * 4 * 1e3,
//   },
//   rolling: true,
//   store: MongooseStore.create({
//     model: 'Session',
//     expires: 3600 * 4,
//   }),
// }, app)));


exports.init = (app) => app;
