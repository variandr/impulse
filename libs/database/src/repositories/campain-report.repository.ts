import { Repository } from 'typeorm';
import { CampaignReport } from '../entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from './base.repository';

import { chunk } from 'lodash';
import { EventName } from '@libs/impulse';

@Injectable()
export class CampaignReportsRepository extends BaseRepository<CampaignReport> {
  private batchSize = 500;

  constructor(
    @InjectRepository(CampaignReport)
    private readonly campaignReportRepo: Repository<CampaignReport>,
  ) {
    super(campaignReportRepo);
  }

  async upsertMany(campaignReports: CampaignReport[]): Promise<void> {
    const campaignChunks = chunk(campaignReports, this.batchSize);

    for (const chunkData of campaignChunks) {
      await this.campaignReportRepo.createQueryBuilder().insert().values(chunkData).orIgnore().execute();
    }
  }

  async getAggregatedRecords(
    limit: number,
    offset: number,
    from_date: Date,
    to_date: Date,
    event_name: EventName,
  ): Promise<{ report_ad_id: string; date: Date; event_count: string }[]> {
    return this.campaignReportRepo
      .createQueryBuilder('report')
      .select(['report.ad_id', 'DATE(report.event_time) AS date', 'COUNT(*) AS event_count'])
      .where('report.event_time BETWEEN :from_date AND :to_date', { from_date, to_date })
      .andWhere('report.event_name = :event_name', { event_name })
      .groupBy('report.ad_id, DATE(report.event_time)')
      .orderBy('DATE(report.event_time)', 'ASC')
      .limit(limit)
      .offset(offset)
      .getRawMany();
  }
}
