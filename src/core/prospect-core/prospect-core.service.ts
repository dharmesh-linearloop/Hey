import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { Prospect } from './prospect-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProspectCorePaginateDto } from './prospect-core.dto';
import { VerificationStatus } from '../contact-core/contact-core.enum';

@Injectable()
export class ProspectCoreService extends TypeormBaseRepository<
  Prospect,
  ProspectCorePaginateDto
> {
  constructor(
    @InjectRepository(Prospect)
    private readonly prospectRepository: Repository<Prospect>,
  ) {
    super(prospectRepository);
  }

  async getProspectCount(shAccountId: number) {
    return this.prospectRepository
      .createQueryBuilder('contact')
      .where('contact.shAccountId = :shAccountId', { shAccountId })
      .andWhere('contact.deletedAt IS NULL')
      .andWhere('contact.verificationStatus != :verificationStatus', {
        verificationStatus: VerificationStatus.Bad,
      })
      .getCount();
  }
}
