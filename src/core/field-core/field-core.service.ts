import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { Field } from './field-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FieldCorePaginateDto } from './field-core.dto';

@Injectable()
export class FieldCoreService extends TypeormBaseRepository<
  Field,
  FieldCorePaginateDto
> {
  constructor(
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
  ) {
    super(fieldRepository);
  }
}
