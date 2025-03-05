import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CampaignReportsFetchDto {
  @IsDate()
  @Type(() => Date)
  from_date: Date;

  @IsDate()
  @Type(() => Date)
  to_date: Date;
}
