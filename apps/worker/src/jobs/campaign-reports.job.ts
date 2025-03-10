import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { CampaignReport, CampaignReportsRepository } from '@libs/database';
import { EventName, ImpulseService } from '@libs/impulse';

@Injectable()
export class CampaignReportsJob {
  private readonly logger = new Logger(CampaignReportsJob.name);

  constructor(
    private readonly campaignReportsRepo: CampaignReportsRepository,
    private readonly impulseService: ImpulseService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async run() {
    this.logger.log('Fetching campaign reports...');
    try {
      const reports = await this.fetchAllReports();
      await this.campaignReportsRepo.upsertMany(reports);
      this.logger.log(`Saved ${reports.length} reports.`);
    } catch (error) {
      this.logger.error('Failed to fetch reports', error);
    }
  }

  private async fetchAllReports(): Promise<CampaignReport[]> {
    const today = new Date().toLocaleDateString('en-GB');

    const eventTypes = Object.values(EventName);
    const reportPromises = eventTypes.map((event) => this.impulseService.getCampaignReports(today, today, event));

    return (await Promise.all(reportPromises)).flat();
  }
}
