import nodemailer from 'nodemailer'

console.log('using gmail oauth2', process.env.GMAIL_REFRESH_TOKEN, process.env.GMAIL_CLIENT_ID, process.env.GMAIL_CLIENT_SECRET);
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'f4econtactcenter@gmail.com',
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
  },
});

exports.init = (app) => app.use(async (ctx, next) => {
  ctx.mailer = transporter;
  await next();
});
