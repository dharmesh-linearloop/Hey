import {
  Controller,
  Body,
  Param,
  UseGuards,
  Post,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AdminLoginJwtGuard } from '../auth/guards/admin-login-jwt.guard';
import { AdminPanelUserService } from './admin-panel-user.service';
import { GetAdminSession } from 'src/shared/decorators/get-admin-session.decorator';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { AdminRoles } from '../../shared/decorators/admin-roles.decorator';
import { findRoleByPermission } from '../auth/keys/admin-role-permission.data';
import { AdminRolesGuard } from '../auth/guards/admin-roles.guard';
import { UpdateAdminPanelUserDto } from './dto/update-admin-panel-user.dto';
import { AdminCookieTokenGuard } from '../auth/guards/admin-cookie-token.guard';
import {
  AdminPanelUserChangePasswordDto,
  CreateAdminPanelUserDto,
  ReSendTokenUrlToEmailDto,
} from './dto/create-admin-panel-user.dto';
import { ListAdminPanelUserDto } from './dto/list-admin-panel-user.dto';
import { Public } from 'src/shared/decorators/public.decorator';

const moduleName = 'Admin Panel User';

@ApiTags('Admin Panel User')
@ApiBearerAuth()
@UseGuards(AdminCookieTokenGuard, AdminLoginJwtGuard)
@Controller('admin-panel-user')
export class AdminPanelUserController {
  constructor(private adminPanelUserService: AdminPanelUserService) {}

  @AdminRoles(findRoleByPermission(['admin_panel_user_list']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `List ${moduleName}` })
  @Post('list')
  findAll(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() query: ListAdminPanelUserDto = {},
  ) {
    return this.adminPanelUserService.findAll({ sessionData, query });
  }

  @AdminRoles(findRoleByPermission(['admin_panel_user_create']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Create ${moduleName}` })
  @Post()
  createAdminUser(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() createAdminPanelUserDto: CreateAdminPanelUserDto,
  ) {
    return this.adminPanelUserService.create({
      sessionData,
      createAdminPanelUserDto,
    });
  }

  @Public()
  @ApiExcludeEndpoint()
  @Patch(':adminUserId/change-password')
  changePassword(
    @Param('adminUserId') adminUserId: number,
    @Body() adminPanelUserChangePasswordDto: AdminPanelUserChangePasswordDto,
  ) {
    return this.adminPanelUserService.changePassword({
      adminUserId,
      adminPanelUserChangePasswordDto,
    });
  }

  @Public()
  @ApiExcludeEndpoint()
  @Post('re-send-token-url')
  async sendTokenUrlToEmail(
    @Body() reSendTokenUrlToEmailDto: ReSendTokenUrlToEmailDto,
  ) {
    return this.adminPanelUserService.sendTokenUrlToEmail({
      reSendTokenUrlToEmailDto,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_panel_user_update']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Update ${moduleName} by ID` })
  @Patch(':adminUserId')
  updateById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('adminUserId') adminUserId: number,
    @Body() updateAdminPanelUserDto: UpdateAdminPanelUserDto,
  ) {
    return this.adminPanelUserService.updateById({
      sessionData,
      adminUserId,
      updateAdminPanelUserDto,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_panel_user_status_update']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Enable ${moduleName} by ID` })
  @Patch(':adminUserId/enable-user')
  enableUserById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('adminUserId') adminUserId: number,
  ) {
    return this.adminPanelUserService.enableUser({
      sessionData,
      adminUserId,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_panel_user_status_update']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Disable ${moduleName} by ID` })
  @Patch(':adminUserId/disable-user')
  disableUserById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('adminUserId') adminUserId: number,
  ) {
    return this.adminPanelUserService.disableUser({
      sessionData,
      adminUserId,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_panel_user_update_token']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Token URL for ${moduleName}` })
  @Post(':adminUserId/send-token-url')
  async sendTokenUrl(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('adminUserId') adminUserId: number,
  ) {
    return this.adminPanelUserService.sendTokenUrl({
      sessionData,
      adminUserId,
    });
  }
}
