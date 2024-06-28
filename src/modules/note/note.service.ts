import { Injectable, BadRequestException, Logger } from '@nestjs/common';

import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { ListNoteDto } from './dto/list-note.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { DateTime } from 'luxon';
import { DeleteNoteDto } from './dto/delete-note.dto';
import { ShAccountCoreService } from 'src/core/sh-account-core/sh-account-core.service';
import { COMMON_ERROR_MESSAGES } from 'src/keys';
import { SharedQueryService } from 'src/shared/modules/shared-query/shared-query.service';
import { SharedLogService } from 'src/shared/modules/shared-log/shared-log.service';
import { updateDatesArr } from 'src/shared/modules/common/common.helper';
import { AdminPanelShAccountNotesCoreService } from 'src/core/admin-panel-sh-account-notes-core/admin-panel-sh-account-notes-core.service';
import { AdminPanelShAccountNotesCorePaginateDto } from 'src/core/admin-panel-sh-account-notes-core/admin-panel-sh-account-notes-core.dto';
import { MasterLogEnum } from 'src/core/mongo/schema/master-log.schema';

@Injectable()
export class NoteService {
  private readonly logger: Logger = new Logger(NoteService.name);

  constructor(
    private shAccountCoreService: ShAccountCoreService,
    private sharedQueryService: SharedQueryService,
    private sharedLogService: SharedLogService,
    private adminPanelShAccountNotesCoreService: AdminPanelShAccountNotesCoreService,
  ) {}

  async findById(params: { sessionData: AdminSessionType; noteId: number }) {
    const { noteId } = params;
    return this.adminPanelShAccountNotesCoreService.findUnique({
      where: { id: noteId },
    });
  }

  async findAll(params: {
    sessionData: AdminSessionType;
    query: ListNoteDto;
  }): Promise<AdminPanelShAccountNotesCorePaginateDto> {
    const { query } = params;

    const modelQuery = await this.sharedQueryService.getNoteQuery({
      query,
      withDeleted: false,
    });

    const noteList =
      await this.adminPanelShAccountNotesCoreService.getQueryBuilderPaginate({
        query,
        modelQuery,
      });

    noteList.list = await updateDatesArr(noteList.list);
    return noteList;
  }

  async create(params: {
    sessionData: AdminSessionType;
    createNoteDto: CreateNoteDto;
    ipAddress: string;
  }) {
    const { createNoteDto, sessionData, ipAddress } = params;
    const { note, shAccountId } = createNoteDto;

    const findAccount = await this.shAccountCoreService.findFirst({
      where: { id: shAccountId },
    });
    if (!findAccount) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
    }

    const createdNote = await this.adminPanelShAccountNotesCoreService.create({
      data: {
        userId: sessionData?.user?.id,
        shAccountId: findAccount?.id,
        note,
      },
    });

    const adminUserId = sessionData?.user?.id;

    await this.sharedLogService.processLog({
      event: MasterLogEnum.NoteAdded,
      eventLogDetail: {
        accountId: shAccountId,
        executorId: adminUserId,
        ipAddress,
        logData: { accountId: shAccountId, note },
      },
      isAdminLog: true,
    });

    return createdNote;
  }

  async deleteById(params: {
    sessionData: AdminSessionType;
    noteId: number;
    deleteNoteDto: DeleteNoteDto;
  }) {
    const { noteId } = params;

    const updatedNote = await this.adminPanelShAccountNotesCoreService.update({
      where: { id: noteId },
      data: {
        deletedAt: DateTime.utc().toISO(),
      },
    });

    return updatedNote;
  }

  async pinById(params: { sessionData: AdminSessionType; noteId: number }) {
    const { noteId } = params;

    return this.adminPanelShAccountNotesCoreService.update({
      where: { id: noteId },
      data: { isPinned: true },
    });
  }

  async unpinById(params: { sessionData: AdminSessionType; noteId: number }) {
    const { noteId } = params;

    return this.adminPanelShAccountNotesCoreService.update({
      where: { id: noteId },
      data: { isPinned: false },
    });
  }
}
