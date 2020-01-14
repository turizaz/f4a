import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'f4econtactcenter@gmail.com',
    pass: 'Stalker03',
  },
});
exports.init = (app) => app.use(async (ctx, next) => {
  ctx.mailer = transporter;
  await next();
});
