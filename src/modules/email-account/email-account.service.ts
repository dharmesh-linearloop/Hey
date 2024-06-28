import { Injectable, Logger } from '@nestjs/common';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { ListEmailAccountDto } from './dto/list-email-account.dto';
import { EmailAccountCoreService } from 'src/core/email-account-core/email-account-core.service';
import { EmailAccountCorePaginateDto } from 'src/core/email-account-core/email-account-core.dto';
import { UpdateEmailAccountDto } from './dto/update-email-account.dto';
import { DateTime } from 'luxon';
import { EmailAccountSettingCoreService } from 'src/core/email-account-setting-core/email-account-setting-core.service';
import { SmtpImapConnectionPayloadCoreService } from 'src/core/smtp-imap-connection-payload-core/smtp-imap-connection-payload-core.service';
import { AxiosService } from 'src/shared/modules/axios/axios.service';
import { SharedQueryService } from 'src/shared/modules/shared-query/shared-query.service';
import {
  updateDates,
  updateDatesArr,
} from 'src/shared/modules/common/common.helper';
import { EmailAccountSettingCode } from 'src/core/email-account-setting-core/email-account-setting-core.enum';
import { EmailAccountType } from 'src/core/email-account-core/email-account-core.enum';
import { SharedLogService } from 'src/shared/modules/shared-log/shared-log.service';
import { UpdateEmailAccountWatchDto } from './dto/update-email-account-watch.dto';
import { MasterLogEnum } from 'src/core/mongo/schema/master-log.schema';
import { AppConfigService } from '../../app-config/app-config.service';

@Injectable()
export class EmailAccountService {
  private readonly logger: Logger = new Logger(EmailAccountService.name);

  constructor(
    private readonly axiosService: AxiosService,
    private emailAccountCoreService: EmailAccountCoreService,
    private emailAccountSettingCoreService: EmailAccountSettingCoreService,
    private smtpImapConnectionPayloadCoreService: SmtpImapConnectionPayloadCoreService,
    private sharedQueryService: SharedQueryService,
    private sharedLogService: SharedLogService,
    private appConfigService: AppConfigService,
  ) {}

  async findById(params: {
    sessionData: AdminSessionType;
    emailAccountId: number;
  }) {
    const { emailAccountId } = params;
    const emailData: any = await this.emailAccountCoreService.findUnique({
      where: { id: emailAccountId },
    });

    if (emailData) {
      emailData['totalLimit'] =
        await this.emailAccountSettingCoreService.findFirst({
          where: {
            emailAccountId: emailAccountId,
            code: EmailAccountSettingCode.DailySendingLimit,
          },
        });

      emailData['remainingLimit'] =
        await this.emailAccountSettingCoreService.findFirst({
          where: {
            emailAccountId: emailAccountId,
            code: EmailAccountSettingCode.AvailableQuota,
          },
        });

      emailData['smtpImapConnection'] =
        await this.smtpImapConnectionPayloadCoreService.findFirst({
          where: { emailAccountId: emailAccountId },
        });
    }

    return updateDates(
      JSON.parse(JSON.stringify(emailData)),
      'MMM d yyyy, hh:mm a (ZZZZ)',
    );
  }

  async findAll(params: {
    sessionData: AdminSessionType;
    query: ListEmailAccountDto;
  }): Promise<EmailAccountCorePaginateDto> {
    const { query } = params;

    const modelQuery = await this.sharedQueryService.getEmailAccountQuery({
      query,
    });

    const emailList =
      await this.emailAccountCoreService.getQueryBuilderPaginate({
        query,
        modelQuery,
      });

    await Promise.all(
      emailList.list.map(async (data, i) => {
        emailList.list[i] = await this.sharedQueryService.getEmailAccountMeta({
          emailAccount: emailList.list[i],
        });
      }),
    );

    emailList.list = await updateDatesArr(
      emailList.list,
      'MMM d yyyy, hh:mm a (ZZZZ)',
    );
    return emailList;
  }

  async updateById(params: {
    sessionData: AdminSessionType;
    emailAccountId: number;
    updateEmailAccountDto: UpdateEmailAccountDto;
  }) {
    const { emailAccountId, updateEmailAccountDto } = params;
    const { email, type } = updateEmailAccountDto;

    return this.emailAccountCoreService.update({
      where: { id: emailAccountId },
      data: {
        fromEmail: email,
        type,
        modifiedAt: DateTime.utc().toISO(),
      },
    });
  }

  async startWatchById(params: {
    sessionData: AdminSessionType;
    emailAccountId: number;
    ipAddress: string;
    updateEmailAccountWatchDto: UpdateEmailAccountWatchDto;
  }) {
    const {
      emailAccountId,
      sessionData,
      ipAddress,
      updateEmailAccountWatchDto,
    } = params;
    const { reason = 'Email Account Watch started' } =
      updateEmailAccountWatchDto;

    const emailAccount = await this.emailAccountCoreService.findUnique({
      where: { id: emailAccountId },
    });

    try {
      if (emailAccount.type === EmailAccountType.SmtpImap) {
        await this.axiosService.post({
          url: `${this.appConfigService.shCoreBaseUrl}${this.appConfigService.shImapConnectionManagerBaseUrl}/connection/${emailAccountId}`,
          data: { emailAccountId },
        });
      } else {
        await this.axiosService.get({
          url: `${this.appConfigService.shCoreBaseUrl}${this.appConfigService.shGmailWatchServiceBaseUrl}/watch/${emailAccountId}/create`,
        });
      }
    } catch (e) {
      this.logger.error(`startWatchById: ${JSON.stringify(e)}`);
    }

    const adminUserId = sessionData?.user?.id;
    await this.sharedLogService.processLog({
      event: MasterLogEnum.EmailAccountWatchStarted,
      eventLogDetail: {
        accountId: emailAccount.shAccountId,
        executorId: adminUserId,
        ipAddress,
        logData: {
          accountId: emailAccount.shAccountId,
          fromEmail: emailAccount.fromEmail,
          note: reason,
        },
      },
    });

    return this.emailAccountCoreService.findUnique({
      where: { id: emailAccountId },
    });
  }

  async stopWatchById(params: {
    sessionData: AdminSessionType;
    emailAccountId: number;
    ipAddress: string;
    updateEmailAccountWatchDto: UpdateEmailAccountWatchDto;
  }) {
    const {
      emailAccountId,
      sessionData,
      ipAddress,
      updateEmailAccountWatchDto,
    } = params;
    const { reason = 'Email Account Watch stopped' } =
      updateEmailAccountWatchDto;

    const emailAccount = await this.emailAccountCoreService.findUnique({
      where: { id: emailAccountId },
    });

    try {
      if (emailAccount.type === EmailAccountType.SmtpImap) {
        await this.axiosService.delete({
          url: `${this.appConfigService.shCoreBaseUrl}${this.appConfigService.shImapConnectionManagerBaseUrl}/connection/${emailAccountId}`,
        });
      } else {
        await this.axiosService.get({
          url: `${this.appConfigService.shCoreBaseUrl}${this.appConfigService.shGmailWatchServiceBaseUrl}/watch/${emailAccountId}/stop`,
        });
      }
    } catch (e) {
      this.logger.error(`stopWatchById: ${JSON.stringify(e)}`);
    }

    const adminUserId = sessionData?.user?.id;
    await this.sharedLogService.processLog({
      event: MasterLogEnum.EmailAccountWatchStopped,
      eventLogDetail: {
        accountId: emailAccount.shAccountId,
        executorId: adminUserId,
        ipAddress,
        logData: {
          accountId: emailAccount.shAccountId,
          fromEmail: emailAccount.fromEmail,
          note: reason,
        },
      },
    });

    return this.emailAccountCoreService.findUnique({
      where: { id: emailAccountId },
    });
  }
}
