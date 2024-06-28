import { Module } from '@nestjs/common';
import { AgencyUserController } from './agency-user.controller';
import { AgencyUserService } from './agency-user.service';
import { SharedQueryModule } from 'src/shared/modules/shared-query/shared-query.module';
import { AgencyUserCoreModule } from 'src/core/agency-user-core/agency-user-core.module';
import { AgencyCoreModule } from 'src/core/agency-core/agency-core.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtAdminAsUserConstants } from '../auth/keys/admin-auth.keys';
import { AgencyUserTokenCoreModule } from 'src/core/agency-user-token-core/agency-user-token-core.module';
import { AppConfigService } from '../../app-config/app-config.service';

@Module({
  imports: [
    SharedQueryModule,
    AgencyUserCoreModule,
    AgencyCoreModule,
    AgencyUserTokenCoreModule,
    JwtModule.registerAsync({
      inject: [AppConfigService],
      useFactory: async (appConfigService: AppConfigService) => ({
        secret: appConfigService.shUserJwtSecret,
        signOptions: {
          expiresIn: jwtAdminAsUserConstants.expiresIn,
        },
      }),
    }),
  ],
  controllers: [AgencyUserController],
  providers: [AgencyUserService],
  exports: [AgencyUserService],
})
export class AgencyUserModule {}
