import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { ConfigModule } from '@libs/config';

import { ImpulseService } from './impulse.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [ImpulseService],
  exports: [ImpulseService],
})
export class ImpulseModule {}
