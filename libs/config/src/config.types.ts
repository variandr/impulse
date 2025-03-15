export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export interface Config {
  app: {
    port: number;
    environment: Environment;
  };
  db: {
    database: string;
    host: string;
    password: string;
    port: number;
    username: string;
  };
  cache: {
    lru: number;
    ttl: number;
    service: string;
    host: string;
    port: number;
  };
  auth: {
    xAccessToken: string;
  };
  impulse: {
    apiKey: string;
    apiUrl: string;
  };
}
