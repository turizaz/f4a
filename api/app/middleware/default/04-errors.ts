import config from '../../config'
exports.init = (app) =>
    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (e) {
            if (config.env === 'development') {
                console.log(e)
            }
            ctx.status = parseInt(e.status,10);
            ctx.body = {
                error: e.message,
            };
        }
    });
