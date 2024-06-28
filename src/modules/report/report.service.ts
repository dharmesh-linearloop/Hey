import { Injectable, Logger } from '@nestjs/common';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { ListLeadReportDto } from './dto/list-lead-report.dto';
import { updateDatesArr } from 'src/shared/modules/common/common.helper';
import { LeadFinderRevealHistoryCoreService } from '../../core/lead-finder-reveal-history-core/lead-finder-reveal-history-core.service';
import { SharedQueryService } from '../../shared/modules/shared-query/shared-query.service';

@Injectable()
export class ReportService {
  private readonly logger: Logger = new Logger(ReportService.name);

  constructor(
    private leadFinderRevealHistoryCoreService: LeadFinderRevealHistoryCoreService,
    private sharedQueryService: SharedQueryService,
  ) {}

  async leadFinderConsumptionList(params: {
    sessionData: AdminSessionType;
    query: ListLeadReportDto;
  }) {
    const { query } = params;

    const modelQuery = await this.sharedQueryService.getLeadReportQuery({
      query,
      withDeleted: false,
    });

    const leadReportListData =
      await this.leadFinderRevealHistoryCoreService.getQueryBuilderPaginate({
        query,
        modelQuery,
      });

    const leadReportList: any = await this.sharedQueryService.getLeadReportList(
      {
        leadReportList: leadReportListData.list,
      },
    );

    leadReportListData.list = await updateDatesArr(leadReportList);
    return leadReportListData;
  }
}
