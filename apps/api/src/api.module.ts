import { Module } from '@nestjs/common';

import { DatabaseModule } from '@libs/database';
import { ImpulseModule } from '@libs/impulse';

import { CampaignReportsController, CampaignReportsService } from './campaign-reports';

@Module({
  imports: [DatabaseModule, ImpulseModule],
  controllers: [CampaignReportsController],
  providers: [CampaignReportsService],
})
export class ApiModule {}
