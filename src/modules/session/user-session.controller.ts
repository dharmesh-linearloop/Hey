import {
  Controller,
  Get,
  Param,
  UseGuards,
  Delete,
  Post,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminLoginJwtGuard } from '../auth/guards/admin-login-jwt.guard';
import { GetAdminSession } from 'src/shared/decorators/get-admin-session.decorator';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { UserSessionService } from './user-session.service';
import { ListUserSessionDto } from './dto/list-user-session.dto';
import { findRoleByPermission } from '../auth/keys/admin-role-permission.data';
import { AdminRolesGuard } from '../auth/guards/admin-roles.guard';
import { AdminRoles } from '../../shared/decorators/admin-roles.decorator';
import { AdminCookieTokenGuard } from '../auth/guards/admin-cookie-token.guard';
import { AdminPanelUserAccessTokensCorePaginateDto } from 'src/core/admin-panel-user-access-tokens-core/admin-panel-user-access-tokens-core.dto';

const moduleName = 'User Session';

@ApiTags('User Session')
@ApiBearerAuth()
@UseGuards(AdminCookieTokenGuard, AdminLoginJwtGuard)
@Controller('user-session')
export class UserSessionController {
  constructor(private userSessionService: UserSessionService) {}

  @AdminRoles(findRoleByPermission(['admin_session_data_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `List ${moduleName}` })
  @Post('list')
  findAllList(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() query: ListUserSessionDto = {},
  ): Promise<AdminPanelUserAccessTokensCorePaginateDto> {
    return this.userSessionService.findAll({ sessionData, query });
  }

  @AdminRoles(findRoleByPermission(['admin_session_data_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Get ${moduleName} by ID` })
  @Get(':sessionId')
  async findById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('sessionId') sessionId: number,
  ) {
    return this.userSessionService.findById({ sessionData, sessionId });
  }

  @AdminRoles(findRoleByPermission(['admin_session_data_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Delete ${moduleName} by ID` })
  @Delete(':sessionId/expire')
  signout(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('sessionId') sessionId: number,
  ) {
    return this.userSessionService.signout({
      sessionId,
      sessionData,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_session_data_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Delete all ${moduleName}` })
  @Delete('expireAll')
  signoutAll(@GetAdminSession() sessionData: AdminSessionType) {
    return this.userSessionService.signoutAll({
      sessionData,
    });
  }
}
