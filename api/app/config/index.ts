import * as dotEnv from 'dotenv'
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  dotEnv.config()
}

export default {
  env: process.env.NODE_ENV || 'development',
  root: process.cwd(),
  POSTGRES_HOST: process.env.POSTGRES_HOST || 'postgres',
  POSTGRES_USER: process.env.POSTGRES_USER || 'postgres',
  POSTGRES_DB: process.env.POSTGRES_DB || 'postgres',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'postgres',
  POSTGRES_PORT: process.env.POSTGRES_PORT || 5432,

  PORT: parseInt(process.env.PORT, 10)|| 5000,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,

  GMAIL_REFRESH_TOKEN: process.env.GMAIL_REFRESH_TOKEN,
  GMAIL_CLIENT_ID: process.env.GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET: process.env.GMAIL_CLIENT_SECRET,

  JWT_SECRET: process.env.JWT_SECRET || 'asdasdasdasdasdssss',
  HOST: process.env.HOST || 'http://localhost:3050',
  GAME_CHAT_ROOM_PREFIX: process.env.GAME_CHAT_ROOM_PREFIX || 'game'
};
