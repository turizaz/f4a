import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'f4econtactcenter@gmail.com',
    refreshToken: '1//04F470xVAQdHTCgYIARAAGAQSNwF-L9IryVK09dXwwdrobhNXFhxP_ZHAqM9X9sV-joBfLV8eXfgYT4K7WPuZrIrm8hR20b90z6s',
    clientId: '630779901626-hjskckj5bji0v483f4bso9vgh78tc2fi.apps.googleusercontent.com',
    clientSecret: 'N-r_Sy2YIHzTYZOSai-gmqip',
  },
});

exports.init = (app) => app.use(async (ctx, next) => {
  ctx.mailer = transporter;
  await next();
});
