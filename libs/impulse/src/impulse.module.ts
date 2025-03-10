import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { ImpulseService } from './impulse.service';

@Module({
  imports: [HttpModule],
  providers: [ImpulseService],
  exports: [ImpulseService],
})
export class ImpulseModule {}
