import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfigService } from '../../../app-config/app-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (
        appConfigService: AppConfigService,
      ): TypeOrmModuleOptions => ({
        type: 'mysql',
        url: appConfigService.mysqlDbUrl,
        charset: 'utf8mb4',
        entities: ['dist/**/*.entity{.ts,.js}'],
        multipleStatements: true,
        synchronize: false,
        // synchronize: true,
        // logging: ['query'],
        maxQueryExecutionTime: 1000,
      }),
    }),
  ],
})
export class MysqlModule {}
