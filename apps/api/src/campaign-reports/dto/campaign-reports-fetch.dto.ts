import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class CampaignReportsFetchDto {
  @IsDate()
  @Type(() => Date)
  from_date: Date;

  @IsDate()
  @Type(() => Date)
  to_date: Date;
}
