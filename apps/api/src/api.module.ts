import { Module } from '@nestjs/common';

import { CacheModule } from '@libs/cache';
import { CommonModule } from '@libs/common';
import { ConfigModule } from '@libs/config';
import { DatabaseModule } from '@libs/database';
import { ImpulseModule } from '@libs/impulse';

import { CampaignReportsController, CampaignReportsService } from './campaign-reports';

@Module({
  imports: [DatabaseModule, ImpulseModule, CacheModule, CommonModule, ConfigModule],
  controllers: [CampaignReportsController],
  providers: [CampaignReportsService],
})
export class ApiModule {}
