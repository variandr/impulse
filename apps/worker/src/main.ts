import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  try {
    await NestFactory.createApplicationContext(WorkerModule);
  } catch (error) {
    logger.error('Error starting Worker service:', error);
  }
}

bootstrap();
