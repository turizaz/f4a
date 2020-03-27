import * as cors from 'koa2-cors'
exports.init = (app) => app.use(cors());
