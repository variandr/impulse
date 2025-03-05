import { Injectable, Logger } from '@nestjs/common';
import { CampaignReportsFetchDto, CampaignReportsParamsDto } from './dto';
import { CampaignReportsRepository } from '@libs/database';
import { EventName, ImpulseService } from '@libs/impulse';

@Injectable()
export class CampaignReportsService {
  private readonly logger = new Logger(CampaignReportsService.name);

  constructor(
    private readonly campaignReportsRepo: CampaignReportsRepository,
    private readonly impulseService: ImpulseService,
  ) {}

  async fetchCampaignReports(params: CampaignReportsFetchDto) {
    const eventTypes = Object.values(EventName);
    const reportPromises = eventTypes.map((event) =>
      this.impulseService.getCampaignReports(params.from_date.toDateString(), params.to_date.toDateString(), event),
    );

    const campaignReports = (await Promise.all(reportPromises)).flat();
    await this.campaignReportsRepo.upsertMany(campaignReports);
    this.logger.log(`Fetched ${campaignReports.length} reports.`);
  }

  async getCampaignReports({ from_date, to_date, event_name, take, page }: CampaignReportsParamsDto) {
    const skip = (page - 1) * take;

    return this.campaignReportsRepo.getAggregatedRecords(take, skip, from_date, to_date, event_name);
  }
}
