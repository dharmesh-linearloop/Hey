import { Module } from '@nestjs/common';
import { ShAccountCoreService } from './sh-account-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShAccount } from './sh-account-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShAccount])],
  providers: [ShAccountCoreService],
  exports: [ShAccountCoreService],
})
export class ShAccountCoreModule {}
