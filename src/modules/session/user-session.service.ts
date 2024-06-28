import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { UserSessionMessages } from '../auth/keys/admin-auth.keys';
import { DateTime } from 'luxon';
import { ListUserSessionDto } from './dto/list-user-session.dto';
import { SharedQueryService } from 'src/shared/modules/shared-query/shared-query.service';
import { AdminPanelUserAccessTokensCoreService } from 'src/core/admin-panel-user-access-tokens-core/admin-panel-user-access-tokens-core.service';
import { updateDatesArr } from 'src/shared/modules/common/common.helper';
import { SessionStatusEnum } from 'src/core/admin-panel-user-access-tokens-core/admin-panel-user-access-tokens-core.enum';
import { Not } from 'typeorm';
import { AdminPanelUserAccessTokensCorePaginateDto } from 'src/core/admin-panel-user-access-tokens-core/admin-panel-user-access-tokens-core.dto';

@Injectable()
export class UserSessionService {
  private readonly logger: Logger = new Logger(UserSessionService.name);

  constructor(
    private sharedQueryService: SharedQueryService,
    private adminPanelUserAccessTokensCoreService: AdminPanelUserAccessTokensCoreService,
  ) {}

  async findAll(params: {
    sessionData: AdminSessionType;
    query: ListUserSessionDto;
  }): Promise<AdminPanelUserAccessTokensCorePaginateDto> {
    const { query } = params;

    const modelQuery = await this.sharedQueryService.getSessionQuery({
      query,
    });

    const sessionList =
      await this.adminPanelUserAccessTokensCoreService.getQueryBuilderPaginate({
        query,
        modelQuery,
      });

    sessionList.list = await updateDatesArr(sessionList.list);
    return sessionList;
  }

  async findById(params: { sessionData: AdminSessionType; sessionId: number }) {
    const { sessionId } = params;
    return this.adminPanelUserAccessTokensCoreService.findUnique({
      where: { id: sessionId },
    });
  }

  async signout(params: { sessionData: AdminSessionType; sessionId: number }) {
    const { sessionId, sessionData } = params;

    const userSessionsData =
      await this.adminPanelUserAccessTokensCoreService.findFirst({
        where: {
          id: sessionId,
          // userId: sessionData.user.id,
        },
      });

    if (userSessionsData && userSessionsData.id !== sessionData.session.id) {
      await this.adminPanelUserAccessTokensCoreService.update({
        where: {
          id: userSessionsData.id,
        },
        data: {
          status: SessionStatusEnum.EXPIRED,
          deletedAt: DateTime.utc().toISO(),
        },
      });

      return { message: UserSessionMessages.SESSION_SIGNOUT_SUCCESS };
    } else {
      throw new BadRequestException(UserSessionMessages.CURRENT_SESSION_EXPIRE);
    }
  }

  async signoutAll(params: { sessionData: AdminSessionType }) {
    const { sessionData } = params;
    await this.adminPanelUserAccessTokensCoreService.updateMany({
      where: {
        id: Not(sessionData.session.id),
        // userId: sessionData.user.id,
      },
      data: {
        status: SessionStatusEnum.EXPIRED,
        deletedAt: DateTime.utc().toISO(),
      },
    });
    return { message: UserSessionMessages.ALL_SESSIONS_SIGNOUT_SUCCESS };
  }
}
