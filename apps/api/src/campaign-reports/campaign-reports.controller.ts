import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CampaignReportsService } from './campaign-reports.service';
import { CampaignReportsFetchDto, CampaignReportsParamsDto } from './dto';
import { AuthGuard } from '@libs/common';

@Controller('campaign-reports')
@UseGuards(AuthGuard)
export class CampaignReportsController {
  constructor(private readonly apiService: CampaignReportsService) {}

  @Get()
  getCampaignReports(@Query() params: CampaignReportsParamsDto) {
    return this.apiService.getCampaignReports(params);
  }

  @Get('fetch')
  fetchCampaignReports(@Query() params: CampaignReportsFetchDto) {
    return this.apiService.fetchCampaignReports(params);
  }
}
