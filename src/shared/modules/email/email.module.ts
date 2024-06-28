import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { PostmarkModule } from '../postmark/postmark.module';

@Module({
  imports: [PostmarkModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
