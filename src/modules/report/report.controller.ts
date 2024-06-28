import { Controller, Body, UseGuards, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminLoginJwtGuard } from '../auth/guards/admin-login-jwt.guard';
import { ReportService } from './report.service';
import { GetAdminSession } from 'src/shared/decorators/get-admin-session.decorator';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { ListLeadReportDto } from './dto/list-lead-report.dto';
import { AdminRoles } from '../../shared/decorators/admin-roles.decorator';
import { findRoleByPermission } from '../auth/keys/admin-role-permission.data';
import { AdminRolesGuard } from '../auth/guards/admin-roles.guard';
import { AdminCookieTokenGuard } from '../auth/guards/admin-cookie-token.guard';

const moduleName = 'Report';

@ApiTags('Report')
@ApiBearerAuth()
@UseGuards(AdminCookieTokenGuard, AdminLoginJwtGuard)
@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @AdminRoles(findRoleByPermission(['admin_log_table_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `List Lead Finder Consumption ${moduleName}` })
  @Post('lead-finder-consumption-list')
  leadFinderConsumptionList(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() query: ListLeadReportDto = {},
  ) {
    return this.reportService.leadFinderConsumptionList({ sessionData, query });
  }
}
