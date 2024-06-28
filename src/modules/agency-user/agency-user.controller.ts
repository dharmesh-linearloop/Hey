import { Controller, Body, UseGuards, Post, Ip, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminLoginJwtGuard } from '../auth/guards/admin-login-jwt.guard';
import { AgencyUserService } from './agency-user.service';
import { GetAdminSession } from 'src/shared/decorators/get-admin-session.decorator';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { AdminCookieTokenGuard } from '../auth/guards/admin-cookie-token.guard';
import { ListAgencyUserDto } from './dto/list-agency-user.dto';
import { AdminRolesGuard } from '../auth/guards/admin-roles.guard';
import { findRoleByPermission } from '../auth/keys/admin-role-permission.data';
import { AdminRoles } from 'src/shared/decorators/admin-roles.decorator';
import { GetUserAgent } from 'src/shared/decorators/get-user-agent.decorator';
import { LoginAsAgencyUserDto } from './dto/login-as-agency-user.dto';

const moduleName = 'Agency User';

@ApiTags('Agency User')
@ApiBearerAuth()
@UseGuards(AdminCookieTokenGuard, AdminLoginJwtGuard)
@Controller('agency-user')
export class AgencyUserController {
  constructor(private agencyUserService: AgencyUserService) {}

  @AdminRoles(findRoleByPermission(['agency_user_list_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `List ${moduleName}` })
  @Post('list')
  findAllList(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() query: ListAgencyUserDto = {},
  ) {
    return this.agencyUserService.findAll({ sessionData, query });
  }

  @AdminRoles(findRoleByPermission(['agency_user_account_login']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Login as ${moduleName}` })
  @Post(':agencyUserId/login-as-agency-user')
  impersonateUser(
    @GetAdminSession() sessionData: AdminSessionType,
    @GetUserAgent() userAgent: string,
    @Ip() ipAddress: string,
    @Param('agencyUserId') agencyUserId: number,
    @Body() loginAsAgencyUserDto: LoginAsAgencyUserDto,
  ) {
    return this.agencyUserService.impersonateUser({
      sessionData,
      userAgent,
      agencyUserId,
      ipAddress,
      loginAsAgencyUserDto,
    });
  }
}
