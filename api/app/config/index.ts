export default {
  port: Number(process.env.PORT) || 5000,
  env: process.env.NODE_ENV || 'development',
  root: process.cwd(),
};
