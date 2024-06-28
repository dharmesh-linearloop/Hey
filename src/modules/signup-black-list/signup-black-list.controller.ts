import {
  Controller,
  Get,
  Body,
  Param,
  UseGuards,
  Post,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminLoginJwtGuard } from '../auth/guards/admin-login-jwt.guard';
import { SignupBlackListService } from './signup-black-list.service';
import { GetAdminSession } from 'src/shared/decorators/get-admin-session.decorator';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { ListSignupBlackListDto } from './dto/list-signup-black-list.dto';
import { AdminRolesGuard } from '../auth/guards/admin-roles.guard';
import { AdminRoles } from '../../shared/decorators/admin-roles.decorator';
import { findRoleByPermission } from '../auth/keys/admin-role-permission.data';
import { CreateSignupBlackListDto } from './dto/create-signup-black-list.dto';
import { DeleteSignupBlackListDto } from './dto/delete-signup-black-list.dto';
import { AdminCookieTokenGuard } from '../auth/guards/admin-cookie-token.guard';

const moduleName = 'Signup BlackList';

@ApiTags('Signup Black List')
@ApiBearerAuth()
@UseGuards(AdminCookieTokenGuard, AdminLoginJwtGuard)
@Controller('signup-black-list')
export class SignupBlackListController {
  constructor(private signupBlackListService: SignupBlackListService) {}

  @AdminRoles(findRoleByPermission(['admin_blacklist_table_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `List ${moduleName}` })
  @Post('list')
  findAllList(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() query: ListSignupBlackListDto = {},
  ) {
    return this.signupBlackListService.findAll({ sessionData, query });
  }

  @AdminRoles(findRoleByPermission(['admin_blacklist_update']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Create ${moduleName}` })
  @Post()
  create(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() createSignupBlackListDto: CreateSignupBlackListDto,
  ) {
    return this.signupBlackListService.create({
      sessionData,
      createSignupBlackListDto,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_blacklist_table_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Get ${moduleName} by ID` })
  @Get(':signupBlackListId')
  async findById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('signupBlackListId') signupBlackListId: number,
  ) {
    return this.signupBlackListService.findById({
      sessionData,
      signupBlackListId,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_blacklist_update']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Delete ${moduleName} by ID` })
  @Delete(':signupBlackListId')
  async deleteById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('signupBlackListId') signupBlackListId: number,
    @Body() deleteSignupBlackListDto: DeleteSignupBlackListDto,
  ) {
    return this.signupBlackListService.deleteById({
      sessionData,
      signupBlackListId,
      deleteSignupBlackListDto,
    });
  }
}
