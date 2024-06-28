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
import { NoteService } from './note.service';
import { GetAdminSession } from 'src/shared/decorators/get-admin-session.decorator';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { ListNoteDto } from './dto/list-note.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { DeleteNoteDto } from './dto/delete-note.dto';
import { AdminRolesGuard } from '../auth/guards/admin-roles.guard';
import { findRoleByPermission } from '../auth/keys/admin-role-permission.data';
import { AdminRoles } from '../../shared/decorators/admin-roles.decorator';
import { AdminCookieTokenGuard } from '../auth/guards/admin-cookie-token.guard';

const moduleName = 'Note';

@ApiTags('Note')
@ApiBearerAuth()
@UseGuards(AdminCookieTokenGuard, AdminLoginJwtGuard)
@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @AdminRoles(findRoleByPermission(['admin_account_note_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `List ${moduleName}` })
  @Post('list')
  findAllList(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() query: ListNoteDto = {},
  ) {
    return this.noteService.findAll({ sessionData, query });
  }

  @AdminRoles(findRoleByPermission(['admin_account_notes_update']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Create ${moduleName}` })
  @Post()
  create(
    @GetAdminSession() sessionData: AdminSessionType,
    @Body() createNoteDto: CreateNoteDto,
    @Ip() ipAddress: string,
  ) {
    return this.noteService.create({
      sessionData,
      createNoteDto,
      ipAddress,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_account_note_view']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Get ${moduleName} by ID` })
  @Get(':noteId')
  async findById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('noteId') noteId: number,
  ) {
    return this.noteService.findById({
      sessionData,
      noteId,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_account_notes_delete']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Delete ${moduleName} by ID` })
  @Delete(':noteId')
  async deleteById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('noteId') noteId: number,
    @Body() deleteNoteDto: DeleteNoteDto,
  ) {
    return this.noteService.deleteById({
      sessionData,
      noteId,
      deleteNoteDto,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_account_notes_update']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Pin ${moduleName} by ID` })
  @Patch(':noteId/pin')
  async pinById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('noteId') noteId: number,
  ) {
    return this.noteService.pinById({
      sessionData,
      noteId,
    });
  }

  @AdminRoles(findRoleByPermission(['admin_account_notes_update']))
  @UseGuards(AdminRolesGuard)
  @ApiOperation({ summary: `Unpin ${moduleName} by ID` })
  @Patch(':noteId/unpin')
  async unpinById(
    @GetAdminSession() sessionData: AdminSessionType,
    @Param('noteId') noteId: number,
  ) {
    return this.noteService.unpinById({
      sessionData,
      noteId,
    });
  }
}
