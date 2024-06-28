import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port() {
    return this.configService.get('port');
  }

  get env() {
    return this.configService.get('env');
  }

  get shAdminApiUrl() {
    return this.configService.get('shAdminApiUrl');
  }

  get shAdminPanelUrl() {
    return this.configService.get('shAdminPanelUrl');
  }

  get mysqlDbUrl() {
    return this.configService.get('mysqlDbUrl');
  }

  get mongodbDbUrl() {
    return this.configService.get('mongodbDbUrl');
  }

  get shUserJwtSecret() {
    return this.configService.get('shUserJwtSecret');
  }

  get stripeKey() {
    return this.configService.get('stripeKey');
  }

  get stripeSecretKey() {
    return this.configService.get('stripeSecretKey');
  }

  get chartmogulApiKey() {
    return this.configService.get('chartmogulApiKey');
  }

  get logApiActivity() {
    return this.configService.get('logApiActivity');
  }

  get bypassOtp() {
    return this.configService.get('bypassOtp');
  }

  get exportEmails() {
    return this.configService.get('exportEmails');
  }

  get shV2BaseUrl() {
    return this.configService.get('shV2BaseUrl');
  }

  get shSuperAdminEmail() {
    return this.configService.get('shSuperAdminEmail');
  }

  get shSuperAdminPassword() {
    return this.configService.get('shSuperAdminPassword');
  }

  get shCoreBaseUrl() {
    return this.configService.get('shCoreBaseUrl');
  }

  get shImapConnectionManagerBaseUrl() {
    return this.configService.get('shImapConnectionManagerBaseUrl');
  }

  get shSequenceManagerBaseUrl() {
    return this.configService.get('shSequenceManagerBaseUrl');
  }

  get shGmailWatchServiceBaseUrl() {
    return this.configService.get('shGmailWatchServiceBaseUrl');
  }

  get shSchedulerEventQueueBaseUrl() {
    return this.configService.get('shSchedulerEventQueueBaseUrl');
  }

  get shTokenManagerBaseUrl() {
    return this.configService.get('shTokenManagerBaseUrl');
  }

  get captchaSecretKey() {
    return this.configService.get('captchaSecretKey');
  }

  get postmarkSecretKey() {
    return this.configService.get('postmarkSecretKey');
  }

  get postmarkFromEmail() {
    return this.configService.get('postmarkFromEmail');
  }

  get postmarkFromName() {
    return this.configService.get('postmarkFromName');
  }

  get redisHost() {
    return this.configService.get('redisHost');
  }

  get redisPort() {
    return this.configService.get('redisPort');
  }

  get redisDb() {
    return this.configService.get('redisDb');
  }

  get redisUsername() {
    return this.configService.get('redisUsername');
  }

  get redisPassword() {
    return this.configService.get('redisPassword');
  }

  get supportAuthToken() {
    return this.configService.get('supportAuthToken');
  }

  get trulyinboxCoreBaseUrl() {
    return this.configService.get('trulyinboxCoreBaseUrl');
  }

  get tempoBaseUrl() {
    return this.configService.get('tempoBaseUrl');
  }

  get lokiBaseUrl() {
    return this.configService.get('lokiBaseUrl');
  }

  get withStdout() {
    return this.configService.get('withStdout');
  }

  get shClientBaseUrl() {
    return this.configService.get('shClientBaseUrl');
  }
}
