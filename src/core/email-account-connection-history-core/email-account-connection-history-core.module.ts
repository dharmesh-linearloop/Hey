import { Module } from '@nestjs/common';
import { EmailAccountConnectionHistoryCoreService } from './email-account-connection-history-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailAccountConnectionHistory } from './email-account-connection-history-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailAccountConnectionHistory])],
  providers: [EmailAccountConnectionHistoryCoreService],
  exports: [EmailAccountConnectionHistoryCoreService],
})
export class EmailAccountConnectionHistoryCoreModule {}
