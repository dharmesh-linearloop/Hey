import { Module } from '@nestjs/common';
import { EmailAccountsPayloadCoreService } from './email-account-payload-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailAccountsPayload } from './email-account-payload-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailAccountsPayload])],
  providers: [EmailAccountsPayloadCoreService],
  exports: [EmailAccountsPayloadCoreService],
})
export class EmailAccountsPayloadCoreModule {}
