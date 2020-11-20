exports.init = (app) =>
    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (e) {
            console.error(`ERROR MESSAGE`);
            console.error(e.message);
            console.error(`END ERROR MESSAGE`);
            if(!e.httpStatus) {
                return ctx.status = 500
            }
            ctx.body = e.body
            return ctx.status = e.httpStatus
        }
    });
