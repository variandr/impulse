import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export default new DataSource({
  database: process.env.DATABASE_DB,
  entities: ['**/*.entity.js'],
  host: process.env.DATABASE_HOST,
  logging: true,
  migrations: ['**/*-migration.js'],
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_PORT) || 5432,
  synchronize: false,
  type: 'postgres',
  username: process.env.DATABASE_USER,
});
