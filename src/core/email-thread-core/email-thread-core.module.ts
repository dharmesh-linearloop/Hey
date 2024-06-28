import { Module } from '@nestjs/common';
import { EmailThreadCoreService } from './email-thread-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailThread } from './email-thread-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailThread])],
  providers: [EmailThreadCoreService],
  exports: [EmailThreadCoreService],
})
export class EmailThreadCoreModule {}
