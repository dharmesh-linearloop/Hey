import { Module } from '@nestjs/common';
import { ContactCoreService } from './contact-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contact-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  providers: [ContactCoreService],
  exports: [ContactCoreService],
})
export class ContactCoreModule {}
