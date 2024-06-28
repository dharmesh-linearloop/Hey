import { Controller, Body, UseGuards, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminLoginJwtGuard } from '../auth/guards/admin-login-jwt.guard';
import { LogService } from './log.service';
import { GetAdminSession } from 'src/shared/decorators/get-admin-session.decorator';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { ListLogDto } from './dto/list-log.dto';
import { AdminRoles } from '../../shared/decorators/admin-roles.decorator';
import { findRoleByPermission } from '../auth/keys/admin-role-permission.data';
import { AdminRolesGuard } from '../auth/guards/admin-roles.guard';
import { AdminCookieTokenGuard } from '../auth/guards/admin-cookie-token.guard';

const moduleName = 'Log';

@ApiTags('Log')
@ApiBearerAuth()
@UseGuards(AdminCookieTokenGuard, AdminLoginJwtGuard)
@Controller('log')
export class LogController {
  constructor(private logService: LogService) {}

  @AdminRoles(findRoleByPermission(['admin_log_table_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `List ${moduleName}` })
  @Post('list')
  findAllList(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() query: ListLogDto = {},
  ) {
    return this.logService.findAll({ sessionData, query });
  }
}
