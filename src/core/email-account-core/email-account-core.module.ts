import { Module } from '@nestjs/common';
import { EmailAccountCoreService } from './email-account-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailAccount } from './email-account-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailAccount])],
  providers: [EmailAccountCoreService],
  exports: [EmailAccountCoreService],
})
export class EmailAccountCoreModule {}
