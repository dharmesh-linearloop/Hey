import { Controller, Body, UseGuards, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminLoginJwtGuard } from '../auth/guards/admin-login-jwt.guard';
import { ExportService } from './export.service';
import { GetAdminSession } from 'src/shared/decorators/get-admin-session.decorator';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { ExportFiltersDto } from './dto/filter-data-export.dto';
import { EXPORT_MODULES_ENUM } from 'src/keys';
import { AdminRoles } from '../../shared/decorators/admin-roles.decorator';
import { AdminRolesGuard } from '../auth/guards/admin-roles.guard';
import { findRoleByPermission } from '../auth/keys/admin-role-permission.data';
import { AdminCookieTokenGuard } from '../auth/guards/admin-cookie-token.guard';

const moduleName = 'Export';

@ApiTags('Export')
@ApiBearerAuth()
@UseGuards(AdminCookieTokenGuard, AdminLoginJwtGuard)
@Controller('export')
export class ExportController {
  constructor(private exportService: ExportService) {}

  @AdminRoles(findRoleByPermission(['admin_user_export']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `${moduleName} Users` })
  @Post('user')
  exportUsers(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() exportFiltersDto: ExportFiltersDto,
  ) {
    return this.exportService.exportData({
      sessionData,
      exportFiltersDto,
      module: EXPORT_MODULES_ENUM.USER,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_account_export']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `${moduleName} Accounts` })
  @Post('account')
  exportAccounts(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() exportFiltersDto: ExportFiltersDto,
  ) {
    return this.exportService.exportData({
      sessionData,
      exportFiltersDto,
      module: EXPORT_MODULES_ENUM.ACCOUNT,
    });
  }

  @AdminRoles(
    findRoleByPermission(['admin_user_export', 'admin_account_export']),
  )
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `${moduleName} Email Accounts` })
  @Post('email-account')
  exportEmailAccounts(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() exportFiltersDto: ExportFiltersDto,
  ) {
    return this.exportService.exportData({
      sessionData,
      exportFiltersDto,
      module: EXPORT_MODULES_ENUM.EMAIL_ACCOUNT,
    });
  }
}
