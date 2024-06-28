import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { UserSetting } from './user-setting-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSettingCorePaginateDto } from './user-setting-core.dto';

@Injectable()
export class UserSettingCoreService extends TypeormBaseRepository<
  UserSetting,
  UserSettingCorePaginateDto
> {
  constructor(
    @InjectRepository(UserSetting)
    private readonly userSettingRepository: Repository<UserSetting>,
  ) {
    super(userSettingRepository);
  }
}
