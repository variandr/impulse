import { plainToInstance } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Environment } from './config.types';

export class EnvConfig {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsInt()
  @IsOptional()
  PORT?: number;

  @IsString()
  @IsNotEmpty()
  DATABASE_DB: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_HOST: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_PASSWORD: string;

  @IsInt()
  DATABASE_PORT: number;

  @IsString()
  @IsNotEmpty()
  DATABASE_USER: string;

  @IsInt()
  @IsNotEmpty()
  CACHE_TTL: number;

  @IsInt()
  @IsNotEmpty()
  CACHE_LRU: number;

  @IsString()
  @IsNotEmpty()
  CACHE_HOST: string;

  @IsInt()
  @IsNotEmpty()
  CACHE_PORT: number;

  @IsString()
  @IsNotEmpty()
  CACHE_SERVICE: string;

  @IsString()
  @IsNotEmpty()
  X_ACCESS_TOKEN: string;

  @IsString()
  @IsNotEmpty()
  IMPULSE_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  IMPULSE_API_URL: string;
}

export function validateEnvConfig(config: Record<string, unknown>): EnvConfig {
  const validatedConfig = plainToInstance(EnvConfig, config, {
    enableImplicitConversion: true,
  });

  for (const [key, value] of Object.entries(validatedConfig)) {
    if (value === undefined || value === null) {
      throw new Error(`Missing environment variable: ${key}`);
    }
  }

  return validatedConfig;
}
