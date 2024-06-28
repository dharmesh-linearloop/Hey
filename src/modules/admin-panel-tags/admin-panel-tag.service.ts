import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { ListAdminPanelTagDto } from './dto/list-admin-panel-tag.dto';
import { SharedQueryService } from 'src/shared/modules/shared-query/shared-query.service';
import { updateDatesArr } from 'src/shared/modules/common/common.helper';
import { AdminPanelTagsCorePaginateDto } from 'src/core/admin-panel-tags-core/admin-panel-tags-core.dto';
import { AdminPanelTagsCoreService } from 'src/core/admin-panel-tags-core/admin-panel-tags-core.service';
import { CreateAdminPanelTagDto } from './dto/create-admin-panel-tag.dto';
import { COMMON_ERROR_MESSAGES } from 'src/keys';
import { DeleteAdminPanelTagDto } from './dto/delete-admin-panel-tag.dto';
import { DateTime } from 'luxon';
import { AdminPanelAccountTagsCoreService } from 'src/core/admin-panel-account-tags-core/admin-panel-account-tags-core.service';

@Injectable()
export class AdminPanelTagService {
  private readonly logger: Logger = new Logger(AdminPanelTagService.name);

  constructor(
    private sharedQueryService: SharedQueryService,
    private adminPanelTagsCoreService: AdminPanelTagsCoreService,
    private adminPanelAccountTagsCoreService: AdminPanelAccountTagsCoreService,
  ) {}

  async findById(params: { sessionData: AdminSessionType; tagId: number }) {
    const { tagId } = params;
    return this.adminPanelTagsCoreService.findUnique({
      where: { id: tagId },
    });
  }

  async findAll(params: {
    sessionData: AdminSessionType;
    query: ListAdminPanelTagDto;
  }): Promise<AdminPanelTagsCorePaginateDto> {
    const { query } = params;

    const modelQuery = await this.sharedQueryService.getTagQuery({
      query,
      withDeleted: false,
    });

    const tagList =
      await this.adminPanelTagsCoreService.getQueryBuilderPaginate({
        query,
        modelQuery,
      });

    tagList.list = await updateDatesArr(tagList.list);
    return tagList;
  }

  async create(params: {
    sessionData: AdminSessionType;
    createAdminPanelTagDto: CreateAdminPanelTagDto;
    ipAddress: string;
  }) {
    const { createAdminPanelTagDto, sessionData } = params;
    const { name } = createAdminPanelTagDto;

    const tagData = await this.adminPanelTagsCoreService.findFirst({
      where: { name },
    });

    if (tagData) {
      if (
        tagData.name.trim().toLowerCase() === name.trim().toLowerCase() &&
        tagData.deletedAt
      ) {
        return this.adminPanelTagsCoreService.update({
          where: { id: tagData.id },
          data: { deletedAt: null, adminUserId: sessionData.user.id },
        });
      } else {
        throw new BadRequestException(COMMON_ERROR_MESSAGES.TAG_EXISTS);
      }
    } else {
      return this.adminPanelTagsCoreService.create({
        data: { name, adminUserId: sessionData.user.id },
      });
    }
  }

  async deleteById(params: {
    sessionData: AdminSessionType;
    tagId: number;
    deleteAdminPanelTagDto: DeleteAdminPanelTagDto;
  }) {
    const { tagId } = params;

    const checkTag = await this.adminPanelTagsCoreService.findFirst({
      where: { id: tagId },
    });

    if (!checkTag) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.TAG_NOT_FOUND);
    }

    const updatedTag = await this.adminPanelTagsCoreService.update({
      where: { id: tagId },
      data: { deletedAt: DateTime.utc().toISO() },
    });

    await this.adminPanelAccountTagsCoreService.deleteMany({
      where: { tagId },
    });

    return updatedTag;
  }
}
