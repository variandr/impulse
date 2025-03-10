import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { WorkerModule } from './worker.module';

async function bootstrap() {
  const logger = new Logger();
  try {
    await NestFactory.createApplicationContext(WorkerModule);
  } catch (error) {
    logger.error('Error starting Worker service:', error);
  }
}

bootstrap();
