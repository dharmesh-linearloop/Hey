import { Module } from '@nestjs/common';
import { RoleCoreService } from './role-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleCoreService],
  exports: [RoleCoreService],
})
export class RoleCoreModule {}
