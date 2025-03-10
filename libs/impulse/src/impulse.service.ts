import { AxiosError, AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { catchError, expand, firstValueFrom, map, of, reduce, retry, takeWhile, throwError } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { CampaignReport } from '@libs/database';

import { EventName, ImpulseUrl } from './impulse.enum';
import { CampaignResponse, FailResponse, SuccessResponse } from './impulse.interface';

@Injectable()
export class ImpulseService {
  private readonly logger = new Logger(ImpulseService.name);
  private readonly headers = { 'x-api-key': process.env.IMPULSE_API_KEY };

  constructor(private readonly http: HttpService) {}

  async getCampaignReports(
    startDate: string,
    endDate: string,
    eventName: EventName,
    url?: string,
  ): Promise<CampaignReport[]> {
    const defaultUrl = `${process.env.IMPULSE_API_URL}${ImpulseUrl.CAMPAIGN_REPORTS}?from_date=${startDate}&to_date=${endDate}&event_name=${eventName}&take=100`;
    const fetchUrl = url || defaultUrl;

    this.logger.log(`Request: ${startDate} - ${endDate}, eventName: ${eventName}, url: ${fetchUrl}`);

    const csv = await firstValueFrom(
      this.http.get(fetchUrl, { headers: this.headers }).pipe(
        retry(1),
        map((res: AxiosResponse<SuccessResponse<CampaignResponse>>) => res.data.data),
        expand((data: CampaignResponse) => {
          if (!data.pagination?.next) return of(null);

          this.logger.log(`Request: ${startDate} - ${endDate}, eventName: ${eventName}, url: ${data.pagination.next}`);
          return this.http.get(data.pagination.next, { headers: this.headers }).pipe(
            retry(1),
            map((res: AxiosResponse<SuccessResponse<CampaignResponse>>) => res.data.data),
            catchError((error: AxiosError<FailResponse>) => {
              this.logger.error(`Pagination fetch failed: ${error.message}`);
              return of(null);
            }),
          );
        }),
        takeWhile((data) => data !== null),
        reduce((acc: string[], data) => [...acc, data.csv], []),
        catchError((error: AxiosError<FailResponse>) => {
          this.logger.error(`Fetch failed: ${error.message}`);
          return throwError(() => new BadRequestException('API request failed'));
        }),
      ),
    );

    const campaignReports = await Promise.all(csv.map(async (value) => this.parseCSVToUpsert(value)));
    return campaignReports.flat();
  }

  private async parseCSVToUpsert(csv: string): Promise<CampaignReport[]> {
    const rows = csv.trim().split('\n');
    const headers = rows[0].split(',');

    const upsertData: CampaignReport[] = [];

    for (let i = 1; i < rows.length; i++) {
      const columns = rows[i].split(',');
      const rowData = {};

      headers.forEach((header, idx) => {
        rowData[header] = columns[idx];
      });

      const campaignReport = plainToClass(CampaignReport, rowData);

      const errors = await validate(campaignReport);
      if (errors && errors?.length > 0) {
        throw new BadRequestException(`Validation failed in row ${i + 1}: ${JSON.stringify(errors)}`);
      }

      upsertData.push(campaignReport);
    }

    return upsertData;
  }
}
