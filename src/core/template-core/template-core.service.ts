import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { Template } from './template-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemplateCorePaginateDto } from './template-core.dto';

@Injectable()
export class TemplateCoreService extends TypeormBaseRepository<
  Template,
  TemplateCorePaginateDto
> {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>,
  ) {
    super(templateRepository);
  }
}
