import { Repository } from 'typeorm';
import { CampaignReport } from '../entities/campaign-report.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CampaignReportsRepository {
  constructor(
    @InjectRepository(CampaignReport)
    private readonly repo: Repository<CampaignReport>,
  ) {}

  async saveUniqueReports(reports: CampaignReport[]) {
    for (const report of reports) {
      await this.repo.upsert(report, ['event_time', 'client_id', 'event_name']);
    }
  }
}
