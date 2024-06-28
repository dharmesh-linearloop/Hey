import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { SequenceSetting } from './sequence-setting-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SequenceSettingCorePaginateDto } from './sequence-setting-core.dto';

@Injectable()
export class SequenceSettingCoreService extends TypeormBaseRepository<
  SequenceSetting,
  SequenceSettingCorePaginateDto
> {
  constructor(
    @InjectRepository(SequenceSetting)
    private readonly sequenceSettingRepository: Repository<SequenceSetting>,
  ) {
    super(sequenceSettingRepository);
  }
}
