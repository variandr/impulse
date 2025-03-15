import { Environment } from './config.types';

export default () => ({
  app: {
    port: Number(process.env.PORT) || 3000,
    environment: (process.env.NODE_ENV as Environment) || Environment.DEVELOPMENT,
  },
  db: {
    database: process.env.DATABASE_DB,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USER,
  },
  cache: {
    ttl: Number(process.env.CACHE_TTL) || 5000,
    lru: Number(process.env.CACHE_LRU) || 100,
    service: process.env.CACHE_SERVICE,
    host: process.env.CACHE_HOST,
    port: Number(process.env.CACHE_PORT) || 6379,
  },
  auth: {
    xAccessToken: process.env.X_ACCESS_TOKEN || 'x-access-token',
  },
  impulse: {
    apiKey: process.env.IMPULSE_API_KEY,
    apiUrl: process.env.IMPULSE_API_URL,
  },
});
