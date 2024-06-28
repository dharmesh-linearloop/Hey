import {
  Controller,
  Get,
  Body,
  Param,
  UseGuards,
  Post,
  Delete,
  Patch,
  Ip,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminLoginJwtGuard } from '../auth/guards/admin-login-jwt.guard';
import { UserService } from './user.service';
import { GetAdminSession } from 'src/shared/decorators/get-admin-session.decorator';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { ListUserDto } from './dto/list-user.dto';
import { SharedColumnsService } from 'src/shared/modules/shared-columns/shared-columns.service';
import { SaveColumnSettingDto } from 'src/shared/modules/shared-columns/dto/save-column-setting.dto';
import { AdminRoles } from '../../shared/decorators/admin-roles.decorator';
import { findRoleByPermission } from '../auth/keys/admin-role-permission.data';
import { AdminRolesGuard } from '../auth/guards/admin-roles.guard';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserAgent } from 'src/shared/decorators/get-user-agent.decorator';
import { LoginAsUserDto } from './dto/login-as-user.dto';
import { AdminCookieTokenGuard } from '../auth/guards/admin-cookie-token.guard';
import { SettingTableEnum } from 'src/core/admin-panel-user-application-settings-core/admin-panel-user-application-settings-core.enum';
import { LoginAsTrulyInboxUserDto } from './dto/login-as-truly-inbox-user.dto';
const moduleName = 'User';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AdminCookieTokenGuard, AdminLoginJwtGuard)
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private sharedColumnsService: SharedColumnsService,
  ) {}

  @AdminRoles(findRoleByPermission(['admin_user_table_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `List ${moduleName}` })
  @Post('list')
  findAllList(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() query: ListUserDto = {},
  ) {
    return this.userService.findAll({ sessionData, query });
  }
  @AdminRoles(findRoleByPermission(['admin_user_table_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `List ${moduleName}` })
  @Post('truly-inbox/list')
  findAllListOfTrulyInboxUser(@Body() query: ListUserDto = {}) {
    return this.userService.findAllTrulyInboxUsers(query);
  }

  @AdminRoles(findRoleByPermission(['admin_user_table_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Get ${moduleName} Table Columns` })
  @Get('/columns')
  async getColumns(@GetAdminSession() sessionData: AdminSessionType) {
    return this.sharedColumnsService.getColumns({
      sessionData,
      table: SettingTableEnum.USER,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_user_table_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Save ${moduleName} Table Columns` })
  @Post('/columns')
  async saveColumns(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() saveColumnSettingDto: SaveColumnSettingDto,
  ) {
    return this.sharedColumnsService.saveColumns({
      sessionData,
      table: SettingTableEnum.USER,
      saveColumnSettingDto,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_user_table_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Get ${moduleName} by ID` })
  @Get(':userId')
  async findById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('userId') userId: number,
  ) {
    return this.userService.findById({ sessionData, userId });
  }

  @AdminRoles(findRoleByPermission(['admin_user_account_delete']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Delete ${moduleName} by ID` })
  @Delete(':userId')
  async deleteById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('userId') userId: number,
    @Body() deleteUserDto: DeleteUserDto,
    @Ip() ipAddress: string,
  ) {
    return this.userService.deleteById({
      sessionData,
      userId,
      deleteUserDto,
      ipAddress,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_user_list']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `${moduleName} Admin list` })
  @Post('/admin/list')
  findAllAdmin(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() query: ListUserDto = {},
  ) {
    return this.userService.findAllAdmin({ sessionData, query });
  }

  @AdminRoles(findRoleByPermission(['admin_user_profile_update']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Update ${moduleName} by ID` })
  @Patch(':userId')
  updateById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
    @Ip() ipAddress: string,
  ) {
    return this.userService.updateById({
      sessionData,
      userId,
      updateUserDto,
      ipAddress,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_account_user_update']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Delete Session ${moduleName} by ID` })
  @Delete(':userId/expired-token')
  deleteUserSessionById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('userId') userId: number,
  ) {
    return this.userService.deleteUserSessionById({
      sessionData,
      userId,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_user_account_login']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Login as ${moduleName}` })
  @Post(':userId/login-as-user')
  impersonateUser(
    @GetAdminSession() sessionData: AdminSessionType,
    @GetUserAgent() userAgent: string,
    @Ip() ipAddress: string,
    @Param('userId') userId: number,
    @Body() loginAsUserDto: LoginAsUserDto,
  ) {
    return this.userService.impersonateUser({
      sessionData,
      userAgent,
      userId,
      ipAddress,
      loginAsUserDto,
    });
  }
  @AdminRoles(findRoleByPermission(['admin_user_account_login']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Login as ${moduleName}` })
  @Post(':userId/login-as-truly-inbox-user')
  impersonateTrulyInboxUser(
    @GetUserAgent() userAgent: string,
    @Body() body: LoginAsTrulyInboxUserDto,
  ) {
    return this.userService.impersonateTrulyInboxUser({
      userAgent,
      email: body?.email,
    });
  }
}
