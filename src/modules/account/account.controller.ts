import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
  Patch,
  Ip,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AdminLoginJwtGuard } from '../auth/guards/admin-login-jwt.guard';
import { AccountService } from './account.service';
import { GetAdminSession } from 'src/shared/decorators/get-admin-session.decorator';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { ListAccountDto } from './dto/list-account.dto';
import { SharedColumnsService } from 'src/shared/modules/shared-columns/shared-columns.service';
import { SaveColumnSettingDto } from 'src/shared/modules/shared-columns/dto/save-column-setting.dto';
import { AdminRoles } from '../../shared/decorators/admin-roles.decorator';
import { findRoleByPermission } from '../auth/keys/admin-role-permission.data';
import { AdminRolesGuard } from '../auth/guards/admin-roles.guard';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { SuspendAccountDto } from './dto/suspend-account.dto';
import { UpdateSalesOwnerUserDto } from './dto/update-sales-owner-user.dto';
import { UpdateSuccessOwnerUserDto } from './dto/update-success-owner-user.dto';
import { UpdateEmailVerificationCreditUsageDto } from './dto/update-email-verification-credit-usage.dto';
import { UpdateAccountSubscriptionDto } from './dto/update-account-subscription.dto';
import { AdminCookieTokenGuard } from '../auth/guards/admin-cookie-token.guard';
import { SettingTableEnum } from 'src/core/admin-panel-user-application-settings-core/admin-panel-user-application-settings-core.enum';
import { AssignSalesOwnerMultiAccountsDto } from './dto/assign-sales-owner-multi-accounts.dto';
import { AssignSuccessOwnerMultiAccountsDto } from './dto/assign-success-owner-multi-accounts.dto';
import { AssignTagsToShAccountDto } from './dto/assign-tags-to-sh-account.dto';
import { UnassignTagFromShAccountDto } from './dto/unassign-tag-from-sh-account.dto';
import { AssignTagsToMultiShAccountsDto } from './dto/assign-tags-to-multi-sh-accounts.dto';
import { Public } from 'src/shared/decorators/public.decorator';
import { ShAccountAssignees } from 'src/core/admin-panel-sh-account-assignees-core/admin-panel-sh-account-assignees-core.enum';
import { SyncStripeDto } from './dto/sync-stripe.dto';

const moduleName = 'Account';

@ApiTags('Account')
@ApiBearerAuth()
@UseGuards(AdminCookieTokenGuard, AdminLoginJwtGuard)
@Controller('account')
export class AccountController {
  constructor(
    private accountService: AccountService,
    private sharedColumnsService: SharedColumnsService,
  ) {}

  @AdminRoles(
    findRoleByPermission([
      'admin_accounts_table_view',
      'admin_account_profile_view',
    ]),
  )
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `List ${moduleName}` })
  @Post('list')
  findAllList(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() query: ListAccountDto = {},
  ) {
    return this.accountService.findAll({ sessionData, query });
  }

  @AdminRoles(findRoleByPermission(['admin_accounts_table_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Get ${moduleName} Table Columns` })
  @Get('/columns')
  async getColumns(@GetAdminSession() sessionData: AdminSessionType) {
    return this.sharedColumnsService.getColumns({
      sessionData,
      table: SettingTableEnum.ACCOUNT,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_accounts_table_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Save ${moduleName} Table Columns` })
  @Post('/columns')
  async saveColumns(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() saveColumnSettingDto: SaveColumnSettingDto,
  ) {
    return this.sharedColumnsService.saveColumns({
      sessionData,
      table: SettingTableEnum.ACCOUNT,
      saveColumnSettingDto,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_accounts_table_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Get ${moduleName} by ID` })
  @Get(':accountId')
  async findById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('accountId') accountId: number,
  ) {
    return this.accountService.findById({ sessionData, accountId });
  }

  @AdminRoles(findRoleByPermission(['admin_account_delete']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Delete ${moduleName} by ID` })
  @Delete(':accountId')
  async deleteById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('accountId') accountId: number,
    @Body() deleteAccountDto: DeleteAccountDto,
    @Ip() ipAddress: string,
  ) {
    return this.accountService.deleteById({
      sessionData,
      accountId,
      deleteAccountDto,
      ipAddress,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_account_delete']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Suspend ${moduleName} by ID` })
  @Patch(':accountId/suspend')
  async suspendById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('accountId') accountId: number,
    @Body() suspendAccountDto: SuspendAccountDto,
    @Ip() ipAddress: string,
  ) {
    return this.accountService.suspendById({
      sessionData,
      accountId,
      suspendAccountDto,
      ipAddress,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_account_profile_update']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Update Sales Owner ${moduleName} by ID` })
  @Patch(':shAccountId/sales-owner')
  updateSalesOwnerById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('shAccountId') shAccountId: number,
    @Body() updateSalesOwnerUserDto: UpdateSalesOwnerUserDto,
    @Ip() ipAddress: string,
  ) {
    return this.accountService.updateSalesOrSuccessOwnerToShAccount({
      sessionData,
      shAccountId,
      userId: updateSalesOwnerUserDto.userId,
      ipAddress,
      role: ShAccountAssignees.SALES,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_account_profile_update']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Update Success Owner ${moduleName} by ID` })
  @Patch(':shAccountId/success-owner')
  updateSuccessOwnerById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('shAccountId') shAccountId: number,
    @Body() updateSuccessOwnerUserDto: UpdateSuccessOwnerUserDto,
    @Ip() ipAddress: string,
  ) {
    return this.accountService.updateSalesOrSuccessOwnerToShAccount({
      sessionData,
      shAccountId,
      userId: updateSuccessOwnerUserDto.userId,
      ipAddress,
      role: ShAccountAssignees.SUCCESS,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_account_profile_update']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({
    summary: `Update Email Verification Credit ${moduleName} by ID`,
  })
  @Patch(':shAccountId/email-verification-credit')
  updateEVCreditUsageById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('shAccountId') shAccountId: number,
    @Body()
    updateEmailVerificationCreditUsageDto: UpdateEmailVerificationCreditUsageDto,
    @Ip() ipAddress: string,
  ) {
    return this.accountService.updateEVCreditUsageById({
      sessionData,
      shAccountId,
      updateEmailVerificationCreditUsageDto,
      ipAddress,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_account_profile_update']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Update ${moduleName} Plan by ID` })
  @Patch(':shAccountId/update-subscription')
  updateById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('shAccountId') shAccountId: number,
    @Body()
    updateAccountSubscriptionDto: UpdateAccountSubscriptionDto,
    @Ip() ipAddress: string,
  ) {
    return this.accountService.updateAccountSubscriptionById({
      sessionData,
      shAccountId,
      updateAccountSubscriptionDto,
      ipAddress,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_account_profile_update']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Sync stripe ${moduleName}  by ID` })
  @Post(':shAccountId/sync-stripe')
  syncStripe(
    @Param('shAccountId') shAccountId: number,
    @Body()
    body: SyncStripeDto,
  ) {
    const { stripeSubscriptionId, applicationType } = body;

    return this.accountService.syncStripe({
      shAccountId,
      stripeSubscriptionId,
      applicationType,
    });
  }

  @AdminRoles(
    findRoleByPermission(['admin_panel_bulk_user_assignees_to_account']),
  )
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Sales Owner Assign Bulk ${moduleName} by Id` })
  @Patch(':salesOwnerId/assign-bulk-sales-owner')
  assignSalesOwnerMultiAccountId(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('salesOwnerId') salesOwnerId: number,
    @Body() assignSalesOwnerMultiAccountsDto: AssignSalesOwnerMultiAccountsDto,
    @Ip() ipAddress: string,
  ) {
    return this.accountService.assignSalesOwnerMultiAccountId({
      sessionData,
      salesOwnerId,
      assignSalesOwnerMultiAccountsDto,
      ipAddress,
    });
  }

  @AdminRoles(
    findRoleByPermission(['admin_panel_bulk_user_assignees_to_account']),
  )
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Success Owner Assign Bulk ${moduleName} by Id` })
  @Patch(':successOwnerId/assign-bulk-success-owner')
  assignSuccessOwnerMultiAccountId(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('successOwnerId') successOwnerId: number,
    @Body()
    assignSuccessOwnerMultiAccountsDto: AssignSuccessOwnerMultiAccountsDto,
    @Ip() ipAddress: string,
  ) {
    return this.accountService.assignSuccessOwnerMultiAccountId({
      sessionData,
      successOwnerId,
      assignSuccessOwnerMultiAccountsDto,
      ipAddress,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_panel_tags_assign_account']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Assign Admin Panel Tags ${moduleName} by ID` })
  @Patch(':shAccountId/tags/assign')
  assignTags(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('shAccountId') shAccountId: number,
    @Body()
    assignTagsToShAccountDto: AssignTagsToShAccountDto,
    @Ip() ipAddress: string,
  ) {
    return this.accountService.assignTagsToShAccount({
      sessionData,
      shAccountId,
      assignTagsToShAccountDto,
      ipAddress,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_panel_tags_remove_account']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Remove Tags ${moduleName} by ID` })
  @Patch(':shAccountId/tags/unassign')
  removeTags(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('shAccountId') shAccountId: number,
    @Body()
    unassignTagFromShAccountDto: UnassignTagFromShAccountDto,
    @Ip() ipAddress: string,
  ) {
    return this.accountService.unassignTagFromShAccount({
      sessionData,
      shAccountId,
      unassignTagFromShAccountDto,
      ipAddress,
    });
  }

  @AdminRoles(
    findRoleByPermission(['admin_panel_bulk_tags_assign_bulk_account']),
  )
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Assign Bulk Tags to Bulk ${moduleName}` })
  @Patch('/tags/bulk-assign')
  assignBulkTagsToBulkAccounts(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body()
    assignTagsToMultiShAccountsDto: AssignTagsToMultiShAccountsDto,
    @Ip() ipAddress: string,
  ) {
    return this.accountService.assignTagsToMultiShAccounts({
      sessionData,
      assignTagsToMultiShAccountsDto,
      ipAddress,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_panel_tags_assign_account_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Get ${moduleName} by ID` })
  @Get(':shAccountId/tags')
  async getAccountTags(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('shAccountId') shAccountId: number,
  ) {
    return this.accountService.getAccountTags({ sessionData, shAccountId });
  }

  @Public()
  @ApiExcludeEndpoint()
  @Patch(':accountId/sync-with-chart-mogul')
  syncAccountWithChartMogul(@Param('accountId') accountId: number) {
    return this.accountService.syncAccountWithChartMogul({ accountId });
  }
}
