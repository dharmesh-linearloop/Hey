import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { ListAgencyUserDto } from './dto/list-agency-user.dto';
import { SharedQueryService } from 'src/shared/modules/shared-query/shared-query.service';
import { updateDatesArr } from 'src/shared/modules/common/common.helper';
import { AgencyUserCoreService } from 'src/core/agency-user-core/agency-user-core.service';
import { AgencyUserCorePaginateDto } from 'src/core/agency-user-core/agency-user-core.dto';
import { LoginAsAgencyUserDto } from './dto/login-as-agency-user.dto';
import { IsNull } from 'typeorm';
import { COMMON_ERROR_MESSAGES } from 'src/keys';
import { AgencyUserStatus } from 'src/core/agency-user-core/agency-user-core.enum';
import { JwtService } from '@nestjs/jwt';
import { AgencyUserTokenCoreService } from 'src/core/agency-user-token-core/agency-user-token-core.service';

@Injectable()
export class AgencyUserService {
  private readonly logger: Logger = new Logger(AgencyUserService.name);

  constructor(
    private sharedQueryService: SharedQueryService,
    private agencyUserCoreService: AgencyUserCoreService,
    private jwtService: JwtService,
    private agencyUserTokenCoreService: AgencyUserTokenCoreService,
  ) {}

  async findAll(params: {
    sessionData: AdminSessionType;
    query: ListAgencyUserDto;
  }): Promise<AgencyUserCorePaginateDto> {
    const { query } = params;

    const modelQuery = await this.sharedQueryService.getAgencyUserQuery({
      query,
      withDeleted: false,
    });

    const agencyUserList =
      await this.agencyUserCoreService.getQueryBuilderPaginate({
        query,
        modelQuery,
      });

    agencyUserList.list = await updateDatesArr(agencyUserList.list);
    return agencyUserList;
  }

  async impersonateUser(params: {
    sessionData: AdminSessionType;
    userAgent: string;
    agencyUserId: number;
    loginAsAgencyUserDto: LoginAsAgencyUserDto;
    ipAddress: string;
  }) {
    const { agencyUserId, userAgent, sessionData } = params;

    const findUser = await this.agencyUserCoreService.findFirst({
      where: { id: agencyUserId, deletedAt: IsNull() },
    });

    if (!findUser) {
      throw new BadRequestException(
        COMMON_ERROR_MESSAGES.AGENCY_USER_NOT_FOUND,
      );
    }

    if (findUser.status === AgencyUserStatus.Invited) {
      throw new BadRequestException(
        COMMON_ERROR_MESSAGES.AGENCY_USER_STATUS_INVITED,
      );
    }

    if (findUser.status === AgencyUserStatus.InActive) {
      throw new BadRequestException(
        COMMON_ERROR_MESSAGES.AGENCY_USER_STATUS_INACTIVE,
      );
    }

    const adminUserId = sessionData?.user?.id;

    const token = await this.jwtService.sign({
      sub: agencyUserId,
      jwtType: 'agency-user',
    });

    return this.agencyUserTokenCoreService.create({
      data: {
        userAgent,
        agencyUserId,
        token,
        adminUserId,
      },
    });
  }
}
