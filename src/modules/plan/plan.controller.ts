import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AdminLoginJwtGuard } from '../auth/guards/admin-login-jwt.guard';
import { PlanService } from './plan.service';
import { GetAdminSession } from 'src/shared/decorators/get-admin-session.decorator';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { AdminRoles } from '../../shared/decorators/admin-roles.decorator';
import { findRoleByPermission } from '../auth/keys/admin-role-permission.data';
import { AdminRolesGuard } from '../auth/guards/admin-roles.guard';
import { AdminCookieTokenGuard } from '../auth/guards/admin-cookie-token.guard';
import { ListPlanDto } from './dto/list-plan.dto';
import { CreatePlanDto } from './dto/create-plan.dto';
import { SharedColumnsService } from 'src/shared/modules/shared-columns/shared-columns.service';
import { SettingTableEnum } from 'src/core/admin-panel-user-application-settings-core/admin-panel-user-application-settings-core.enum';
import { SaveColumnSettingDto } from 'src/shared/modules/shared-columns/dto/save-column-setting.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { FindAllPlanDto } from './dto/find-all-plan.dto';

const moduleName = 'Plan';

@ApiTags('Plan')
@ApiBearerAuth()
@UseGuards(AdminCookieTokenGuard, AdminLoginJwtGuard)
@Controller('plan')
export class PlanController {
  constructor(
    private planService: PlanService,
    private sharedColumnsService: SharedColumnsService,
  ) {}

  @AdminRoles(
    findRoleByPermission([
      'admin_account_profile_view',
      'admin_accounts_table_view',
    ]),
  )
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `List ${moduleName}` })
  @Get()
  findAll(
    @GetAdminSession() sessionData: AdminSessionType,
    @Query() query: FindAllPlanDto,
  ) {
    if (sessionData) {
      return this.planService.findAllList({
        excludeCustomPlans: query.excludeCustomPlans,
      });
    }
  }

  @AdminRoles(findRoleByPermission(['admin_plan_list_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `List ${moduleName}` })
  @Post('list')
  findAllList(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() query: ListPlanDto = {},
  ) {
    return this.planService.findAll({ sessionData, query });
  }

  @AdminRoles(findRoleByPermission(['admin_plan_list_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Get ${moduleName} Table Columns` })
  @Get('/columns')
  async getColumns(@GetAdminSession() sessionData: AdminSessionType) {
    return this.sharedColumnsService.getColumns({
      sessionData,
      table: SettingTableEnum.PLAN,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_plan_list_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Save ${moduleName} Table Columns` })
  @Post('/columns')
  async saveColumns(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() saveColumnSettingDto: SaveColumnSettingDto,
  ) {
    return this.sharedColumnsService.saveColumns({
      sessionData,
      table: SettingTableEnum.PLAN,
      saveColumnSettingDto,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_plan_list_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Get ${moduleName} by ID` })
  @Get(':planId')
  async findById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('planId') planId: number,
  ) {
    return this.planService.findById({ sessionData, planId });
  }

  @ApiExcludeEndpoint()
  @AdminRoles(findRoleByPermission(['admin_plan_list_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Get ${moduleName} by ID` })
  @Get('/stripe/:stripePlanId')
  async findStripePlanById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('stripePlanId') stripePlanId: string,
  ) {
    return this.planService.findStripePlanById({ sessionData, stripePlanId });
  }

  @AdminRoles(findRoleByPermission(['admin_plan_create']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Create ${moduleName}` })
  @Post()
  create(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() createPlanDto: CreatePlanDto,
  ) {
    return this.planService.create({
      sessionData,
      createPlanDto,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_plan_update']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Update ${moduleName}` })
  @Patch(':planId')
  update(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() updatePlanDto: UpdatePlanDto,
    @Param('planId') planId: number,
  ) {
    return this.planService.update({
      sessionData,
      planId,
      updatePlanDto,
    });
  }
}
