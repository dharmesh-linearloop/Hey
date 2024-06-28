import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { ListSignupBlackListDto } from './dto/list-signup-black-list.dto';
import { CreateSignupBlackListDto } from './dto/create-signup-black-list.dto';
import { DeleteSignupBlackListDto } from './dto/delete-signup-black-list.dto';
import { COMMON_ERROR_MESSAGES } from 'src/keys';
import { SharedQueryService } from 'src/shared/modules/shared-query/shared-query.service';
import { updateDatesArr } from 'src/shared/modules/common/common.helper';
import { SignupBlackListsCoreService } from 'src/core/signup-black-lists-core/signup-black-lists-core.service';
import { SignupBlackListsCorePaginateDto } from 'src/core/signup-black-lists-core/signup-black-lists-core.dto';
import { In } from 'typeorm';
import { SignupBlackListType } from 'src/core/signup-black-lists-core/signup-black-lists-core.enum';

@Injectable()
export class SignupBlackListService {
  private readonly logger: Logger = new Logger(SignupBlackListService.name);

  constructor(
    private signupBlackListsCoreService: SignupBlackListsCoreService,
    private sharedQueryService: SharedQueryService,
  ) {}

  async findById(params: {
    sessionData: AdminSessionType;
    signupBlackListId: number;
  }) {
    const { signupBlackListId } = params;
    return this.signupBlackListsCoreService.findUnique({
      where: { id: signupBlackListId },
    });
  }

  async findAll(params: {
    sessionData: AdminSessionType;
    query: ListSignupBlackListDto;
  }): Promise<SignupBlackListsCorePaginateDto> {
    const { query } = params;

    const modelQuery = await this.sharedQueryService.getSignupBlackListQuery({
      query,
    });

    const signUpBlackList =
      await this.signupBlackListsCoreService.getQueryBuilderPaginate({
        query,
        modelQuery,
      });

    signUpBlackList.list = await updateDatesArr(signUpBlackList.list);
    return signUpBlackList;
  }

  async create(params: {
    sessionData: AdminSessionType;
    createSignupBlackListDto: CreateSignupBlackListDto;
  }) {
    const {
      createSignupBlackListDto,
      sessionData: {
        user: { id: userId },
      },
    } = params;

    const { value, note, reasonType, type } = createSignupBlackListDto;

    const valueArr = value.split(',');
    let valueList = valueArr.map((d) => {
      return d.trim().toLowerCase();
    });
    valueList = [...new Set([...valueList])];

    const checkList = await this.signupBlackListsCoreService.findMany({
      where: { value: In(valueList) },
    });

    if (checkList.length > 0) {
      if (type === SignupBlackListType.Domain) {
        throw new BadRequestException(
          COMMON_ERROR_MESSAGES.BLACKLIST_DOMAIN_EXISTS,
        );
      } else if (type === SignupBlackListType.Email) {
        throw new BadRequestException(
          COMMON_ERROR_MESSAGES.BLACKLIST_EMAIL_EXISTS,
        );
      } else if (type === SignupBlackListType.IP) {
        throw new BadRequestException(
          COMMON_ERROR_MESSAGES.BLACKLIST_IP_EXISTS,
        );
      }
    }

    const dataToInsert = valueList.map((value) => {
      return { value, userId, note, reasonType, type };
    });

    const blackListData = await this.signupBlackListsCoreService.createMany({
      data: dataToInsert,
    });

    return blackListData;
  }

  async deleteById(params: {
    sessionData: AdminSessionType;
    signupBlackListId: number;
    deleteSignupBlackListDto: DeleteSignupBlackListDto;
  }) {
    const { signupBlackListId } = params;

    const updatedList = await this.signupBlackListsCoreService.delete({
      where: { id: signupBlackListId },
    });

    return updatedList;
  }
}
