import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigService as NestConfigService } from '@nestjs/config';

import { validateEnvConfig } from '@libs/config/config.validation';

import { ConfigService } from './config.service';
import config from './configuration';

@Module({
  imports: [NestConfigModule.forRoot({ isGlobal: true, load: [config], validate: validateEnvConfig })],
  providers: [NestConfigService, ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
