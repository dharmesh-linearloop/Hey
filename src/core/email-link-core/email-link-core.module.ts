import { Module } from '@nestjs/common';
import { EmailLinkCoreService } from './email-link-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailLink } from './email-link-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailLink])],
  providers: [EmailLinkCoreService],
  exports: [EmailLinkCoreService],
})
export class EmailLinkCoreModule {}
