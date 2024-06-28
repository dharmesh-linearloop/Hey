import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { Contact } from './contact-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactCorePaginateDto } from './contact-core.dto';

@Injectable()
export class ContactCoreService extends TypeormBaseRepository<
  Contact,
  ContactCorePaginateDto
> {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {
    super(contactRepository);
  }
}
