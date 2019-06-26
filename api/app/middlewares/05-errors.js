exports.init = (app) =>
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      ctx.set('X-Content-Type-Options', 'nosniff');

      const preferredType = ctx.accepts('html', 'json');
      console.log(e.code)
      if (parseInt(e.code) === 23505) {
        ctx.status = 409;
        ctx.body = {errors: ['Запись уже существует']};
      } else if (e.status) {
        ctx.status = e.status;

        // could use template methods to render error page
        if (preferredType === 'json') {
          ctx.body = {
            error: e.message,
          };
        } else {
          ctx.body = e.message;
        }
      } else if (e.name === 'ValidationError') {
        ctx.status = 400;

        const errors = {};

        for (const field in e.errors) {
          if (e.errors.hasOwnProperty(field)) {
            errors[field] = e.errors[field].message
          }
        }

        if (preferredType === 'json') {
          ctx.body = {
            errors: errors,
          };
        } else {
          ctx.body = 'Некорректные данные.';
        }
      } else {
        ctx.body = 'Error 500';
        ctx.status = 500;
        console.error(e.message, e.stack);
      }
    }
  });
