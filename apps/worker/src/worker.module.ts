import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { DatabaseModule } from '@libs/database';
import { ImpulseModule } from '@libs/impulse';

import { CampaignReportsJob } from './jobs';

@Module({
  imports: [DatabaseModule, ImpulseModule, ScheduleModule.forRoot()],
  providers: [CampaignReportsJob],
})
export class WorkerModule {}
