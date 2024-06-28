import {
  Controller,
  Body,
  UseGuards,
  Post,
  Get,
  Ip,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminLoginJwtGuard } from '../auth/guards/admin-login-jwt.guard';
import { AdminPanelTagService } from './admin-panel-tag.service';
import { GetAdminSession } from 'src/shared/decorators/get-admin-session.decorator';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { AdminCookieTokenGuard } from '../auth/guards/admin-cookie-token.guard';
import { ListAdminPanelTagDto } from './dto/list-admin-panel-tag.dto';
import { CreateAdminPanelTagDto } from './dto/create-admin-panel-tag.dto';
import { DeleteAdminPanelTagDto } from './dto/delete-admin-panel-tag.dto';
import { AdminRoles } from 'src/shared/decorators/admin-roles.decorator';
import { findRoleByPermission } from '../auth/keys/admin-role-permission.data';
import { AdminRolesGuard } from '../auth/guards/admin-roles.guard';

const moduleName = 'Admin Panel Tag';

@ApiTags('Admin Panel Tag')
@ApiBearerAuth()
@UseGuards(AdminCookieTokenGuard, AdminLoginJwtGuard)
@Controller('admin-panel-tag')
export class AdminPanelTagController {
  constructor(private adminpanelTagService: AdminPanelTagService) {}

  @AdminRoles(findRoleByPermission(['admin_panel_tags_list_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `List ${moduleName}` })
  @Post('list')
  findAllList(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() query: ListAdminPanelTagDto = {},
  ) {
    return this.adminpanelTagService.findAll({ sessionData, query });
  }

  @AdminRoles(findRoleByPermission(['admin_panel_tags_create']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Create ${moduleName}` })
  @Post()
  create(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() createAdminPanelTagDto: CreateAdminPanelTagDto,
    @Ip() ipAddress: string,
  ) {
    return this.adminpanelTagService.create({
      sessionData,
      createAdminPanelTagDto,
      ipAddress,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_panel_tags_list_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Get ${moduleName} by ID` })
  @Get(':tagId')
  async findById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('tagId') tagId: number,
  ) {
    return this.adminpanelTagService.findById({
      sessionData,
      tagId,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_panel_tags_delete']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Delete ${moduleName} by ID` })
  @Delete(':tagId')
  async deleteById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('tagId') tagId: number,
    @Body() deleteAdminPanelTagDto: DeleteAdminPanelTagDto,
  ) {
    return this.adminpanelTagService.deleteById({
      sessionData,
      tagId,
      deleteAdminPanelTagDto,
    });
  }
}
