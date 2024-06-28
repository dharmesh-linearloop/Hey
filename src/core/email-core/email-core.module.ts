import { Module } from '@nestjs/common';
import { EmailCoreService } from './email-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from './email-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Email])],
  providers: [EmailCoreService],
  exports: [EmailCoreService],
})
export class EmailCoreModule {}
