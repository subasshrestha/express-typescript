import dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_URI,
  NODE_ENV,
  CORS_ALLOWED_ORIGINS,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = process.env;

export default {
  NodeEnv: NODE_ENV || '',
  app: {
    port: PORT || 4000,
    corsOrigins: (CORS_ALLOWED_ORIGINS ?? '').split(','),
  },
  db: {
    uri:
      DB_URI ||
      `mongodb://${DB_HOST || 'localhost'}:${DB_PORT || '27017'}/${
        DB_NAME || 'zebec-backend'
      }`,
  },
  jwt: {
    secret: JWT_SECRET || 'secret',
    expiresIn: JWT_EXPIRES_IN || '1d',
  },
} as const;
