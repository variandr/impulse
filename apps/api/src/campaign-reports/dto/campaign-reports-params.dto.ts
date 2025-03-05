import { IsDate, IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { EventName } from '@libs/impulse';

export class CampaignReportsParamsDto {
  @IsDate()
  @Type(() => Date)
  from_date: Date;

  @IsDate()
  @Type(() => Date)
  to_date: Date;

  @IsEnum(EventName)
  event_name: EventName;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  take: number = 10;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number = 1;
}
