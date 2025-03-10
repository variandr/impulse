import { rateLimit } from 'express-rate-limit';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ErrorInterceptor, SecurityMiddleware } from '@libs/common';

import { ApiModule } from './api.module';

async function bootstrap() {
  const logger = new Logger();
  try {
    const app = await NestFactory.create(ApiModule);
    app.setGlobalPrefix('api/v1');

    app.useGlobalInterceptors(new ErrorInterceptor());

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    app.use(new SecurityMiddleware().use);
    app.use(
      rateLimit({
        windowMs: 10 * 60 * 1000,
        limit: 100,
      }),
    );

    await app.listen(process.env.port || 3000);
  } catch (error) {
    logger.error('Error during bootstrap api app:', error);
  }
}

bootstrap();
