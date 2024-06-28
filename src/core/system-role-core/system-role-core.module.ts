import { Module } from '@nestjs/common';
import { SystemRoleCoreService } from './system-role-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemRole } from './system-role-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemRole])],
  providers: [SystemRoleCoreService],
  exports: [SystemRoleCoreService],
})
export class SystemRoleCoreModule {}
