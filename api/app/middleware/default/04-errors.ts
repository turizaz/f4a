exports.init = (app) =>
    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (e) {
            if(!e.httpStatus) {
                return ctx.status = 500
            }
            ctx.body = e.body
            return ctx.status = e.httpStatus
        }
    });
