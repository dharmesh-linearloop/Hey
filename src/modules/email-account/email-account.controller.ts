import {
  Controller,
  Get,
  Body,
  Param,
  UseGuards,
  Post,
  Patch,
  Ip,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminLoginJwtGuard } from '../auth/guards/admin-login-jwt.guard';
import { EmailAccountService } from './email-account.service';
import { GetAdminSession } from 'src/shared/decorators/get-admin-session.decorator';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { ListEmailAccountDto } from './dto/list-email-account.dto';
import { AdminRoles } from '../../shared/decorators/admin-roles.decorator';
import { AdminRolesGuard } from '../auth/guards/admin-roles.guard';
import { findRoleByPermission } from '../auth/keys/admin-role-permission.data';
import { UpdateEmailAccountDto } from './dto/update-email-account.dto';
import { AdminCookieTokenGuard } from '../auth/guards/admin-cookie-token.guard';
import { UpdateEmailAccountWatchDto } from './dto/update-email-account-watch.dto';

const moduleName = 'Email Account';

@ApiTags('Email Account')
@ApiBearerAuth()
@UseGuards(AdminCookieTokenGuard, AdminLoginJwtGuard)
@Controller('email-account')
export class EmailAccountController {
  constructor(private emailAccountService: EmailAccountService) {}

  @AdminRoles(findRoleByPermission(['admin_email_table_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `List ${moduleName}` })
  @Post('list')
  findAllList(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() query: ListEmailAccountDto = {},
  ) {
    return this.emailAccountService.findAll({ sessionData, query });
  }

  @AdminRoles(findRoleByPermission(['admin_email_table_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Get ${moduleName} by ID` })
  @Get(':emailAccountId')
  async findById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('emailAccountId') emailAccountId: number,
  ) {
    return this.emailAccountService.findById({ sessionData, emailAccountId });
  }

  @AdminRoles(findRoleByPermission(['admin_email_update']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Update ${moduleName} by ID` })
  @Patch(':emailAccountId')
  async updateById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('emailAccountId') emailAccountId: number,
    @Body() updateEmailAccountDto: UpdateEmailAccountDto,
  ) {
    return this.emailAccountService.updateById({
      sessionData,
      emailAccountId,
      updateEmailAccountDto,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_email_update']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Start Watch for ${moduleName} by ID` })
  @Patch(':emailAccountId/start-watch')
  async startWatchById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('emailAccountId') emailAccountId: number,
    @Body() updateEmailAccountWatchDto: UpdateEmailAccountWatchDto,
    @Ip() ipAddress: string,
  ) {
    return this.emailAccountService.startWatchById({
      sessionData,
      emailAccountId,
      ipAddress,
      updateEmailAccountWatchDto,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_email_update']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Stop Watch for ${moduleName} by ID` })
  @Patch(':emailAccountId/stop-watch')
  async stopWatchById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('emailAccountId') emailAccountId: number,
    @Body() updateEmailAccountWatchDto: UpdateEmailAccountWatchDto,
    @Ip() ipAddress: string,
  ) {
    return this.emailAccountService.stopWatchById({
      sessionData,
      emailAccountId,
      ipAddress,
      updateEmailAccountWatchDto,
    });
  }
}
