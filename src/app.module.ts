import {
  HttpModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AdminAuthModule } from './modules/auth/auth.module';
import { AxiosModule } from './shared/modules/axios/axios.module';
import { SeedModule } from './modules/seed/seed.module';
import { AccountModule } from './modules/account/account.module';
import { UserModule } from './modules/user/user.module';
import { ExportModule } from './modules/export/export.module';
import { QueueModule } from './modules/queue/queue.module';
import { EmailAccountModule } from './modules/email-account/email-account.module';
import { SignupBlackListModule } from './modules/signup-black-list/signup-black-list.module';
import { LogModule } from './modules/log/log.module';
import { PlanModule } from './modules/plan/plan.module';
import { UserSessionModule } from './modules/session/user-session.module';
import { NoteModule } from './modules/note/note.module';
import { MysqlModule } from './shared/modules/mysql/mysql.module';
import { AdminPanelUserModule } from './modules/admin-panel-user/admin-panel-user.module';
import { MongodbModule } from './shared/modules/mongodb/mongodb.module';
import { IoRedisModule } from './shared/modules/io-redis/io-redis.module';
import { AdminPanelTagModule } from './modules/admin-panel-tags/admin-panel-tag.module';
import { AgencyUserModule } from './modules/agency-user/agency-user.module';
import { ReportModule } from './modules/report/report.module';
import {
  LoggerModule,
  OtelModule,
  RequestContextModule,
  ResponseBodyModule,
} from '@salesahandy/observability';
import { SERVICE_NAME } from './keys';
import { logger } from './sh-logger';
import { LoggerMiddleware } from './shared/middlewares/log.middleware';
import { AppConfigModule } from './app-config/app-config.module';

@Module({
  imports: [
    AppConfigModule,
    HttpModule,
    ResponseBodyModule,
    OtelModule.forRoot({
      service: SERVICE_NAME,
      tempoBaseURL: process.env.TEMPO_BASE_URL,
    }),
    LoggerModule.forRoot({
      logger,
      exclude: [{ path: '(.*)/image-broker/(.*)', method: RequestMethod.POST }],
    }),
    RequestContextModule,
    MysqlModule,
    MongodbModule,
    IoRedisModule,
    ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
    QueueModule,
    AxiosModule,
    AdminAuthModule,
    AccountModule,
    UserModule,
    EmailAccountModule,
    SignupBlackListModule,
    LogModule,
    ExportModule,
    PlanModule,
    UserSessionModule,
    NoteModule,
    AdminPanelUserModule,
    AdminPanelTagModule,
    AgencyUserModule,
    ReportModule,
    SeedModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
