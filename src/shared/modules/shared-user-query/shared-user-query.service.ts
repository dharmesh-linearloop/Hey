import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import {
  COMMON_ERROR_MESSAGES,
  CONNECTION_PAYLOAD,
  USER_STATUS,
  Status,
} from 'src/keys';
import { EmailAccountCoreService } from 'src/core/email-account-core/email-account-core.service';
import { SequenceEmailAccountCoreService } from 'src/core/sequence-email-account-core/sequence-email-account-core.service';
import { SequenceCoreService } from 'src/core/sequence-core/sequence-core.service';
import { DateTime } from 'luxon';
import { AxiosService } from '../axios/axios.service';
import { EmailAccountsPayloadCoreService } from 'src/core/email-account-payload-core/email-account-payload-core.service';
import { EmailAccountConnectionHistoryCoreService } from 'src/core/email-account-connection-history-core/email-account-connection-history-core.service';
import { UserCoreService } from 'src/core/user-core/user-core.service';
import { UserTokenCoreService } from 'src/core/user-token-core/user-token-core.service';
import { EmailAccountType } from 'src/core/email-account-core/email-account-core.enum';
import { SequenceProgress } from 'src/core/sequence-core/sequence-core.enum';
import { In, IsNull } from 'typeorm';
import { AppConfigService } from '../../../app-config/app-config.service';

@Injectable()
export class SharedUserQueryService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly emailAccountCoreService: EmailAccountCoreService,
    private readonly sequenceEmailAccountCoreService: SequenceEmailAccountCoreService,
    private readonly sequenceCoreService: SequenceCoreService,
    private readonly axiosService: AxiosService,
    private readonly userCoreService: UserCoreService,
    private readonly emailAccountsPayloadCoreService: EmailAccountsPayloadCoreService,
    private readonly emailAccountConnectionHistoryCoreService: EmailAccountConnectionHistoryCoreService,
    private readonly userTokenCoreService: UserTokenCoreService,
    private readonly appConfigService: AppConfigService,
  ) {}

  async deleteUser(params: { userId: number; inactiveOnly?: boolean }) {
    const { userId, inactiveOnly = false } = params;

    const userData = await this.userCoreService.findFirst({
      where: { id: userId, deletedAt: IsNull() },
    });

    if (!userData) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const emailAccountData = await this.emailAccountCoreService.findMany({
      where: { userId: userData.id, status: Status.Active },
    });

    if (emailAccountData.length) {
      await Promise.all(
        emailAccountData.map(async (emailAccount) => {
          const emailAccountId = emailAccount.id;

          // Pausing sequences linked to this Email account
          await this.pauseSequencesByEmailAccountId(emailAccountId);

          try {
            if (emailAccount.type === EmailAccountType.SmtpImap) {
              await this.axiosService.delete({
                url: `${this.appConfigService.shCoreBaseUrl}${this.appConfigService.shImapConnectionManagerBaseUrl}/connection/${emailAccountId}`,
              });
            } else {
              await this.axiosService.get({
                url: `${this.appConfigService.shCoreBaseUrl}${this.appConfigService.shGmailWatchServiceBaseUrl}/watch/${emailAccountId}/stop`,
              });

              // Resetting `accessToken` and `expiresIn` for the disconnected account
              const emailAccountsPayload =
                await this.emailAccountsPayloadCoreService.findFirst({
                  where: { emailAccountId },
                });

              const connectionPayload = await this.getToken(emailAccount.id, {
                reason: 'Token generated',
              });
              connectionPayload.accessToken = '';
              connectionPayload.expiresIn = 0;

              await this.setToken({
                connectionPayload,
                emailAccountId,
                emailAccountPayloadId: emailAccountsPayload.id,
              });
            }
          } catch (e) {}

          // Send an event to the scheduler when an email account gets disconnected.
          await this.schedulerEvent('email-account-disconnected', {
            emailAccountId,
          });

          // Logging disconnected message for email account
          await this.emailAccountConnectionHistoryCoreService.create({
            data: {
              emailAccountId,
              executor: 'SH-ADMIN',
              message: 'Email Account Disconnected.',
              reason: 'Email Account Disconnected.',
              status: 'disconnected',
              service: 'SH-ADMIN-PANEL',
            },
          });

          await this.emailAccountCoreService.update({
            where: { id: emailAccountId },
            data: { status: Status.Inactive },
          });
        }),
      );
    }

    try {
      const tokens = await this.userTokenCoreService.findMany({
        where: { userId },
      });

      if (tokens) {
        const tokenKeys = tokens.map((t) => {
          return `token:${userId}:${t.token}`;
        });
        await this.redis.del(tokenKeys);
      }
    } catch (e) {}

    await this.userTokenCoreService.deleteMany({
      where: { userId },
    });

    if (!inactiveOnly) {
      const updatedEmail = userData.email.replace('@', `+deleted_${userId}@`);
      await this.userCoreService.update({
        where: { id: userData.id },
        data: {
          email: updatedEmail,
          status: USER_STATUS.Deleted,
        },
      });
    }
  }

  async pauseSequencesByEmailAccountId(emailAccountId: number) {
    const sequences = await this.sequenceEmailAccountCoreService.findMany({
      where: {
        emailAccountId,
        deletedAt: IsNull(),
        sequence: { progress: SequenceProgress.Active },
      },
    });

    const sequenceIds = sequences.map(({ sequenceId }) => sequenceId);

    await this.sequenceCoreService.updateMany({
      where: { id: In(sequenceIds) },
      data: {
        progress: SequenceProgress.Pause,
        pausedReasonIdentifier: 2,
        pausedAt: DateTime.utc().toISO(),
      },
    });

    await this.schedulerEvent('sequences-paused', { sequenceIds });
    return sequenceIds;
  }

  async getToken(emailAccountId: number, params: { reason: string }) {
    const { data } = await this.axiosService.get({
      url: `${this.appConfigService.shCoreBaseUrl}${this.appConfigService.shTokenManagerBaseUrl}/api/v1/user/${emailAccountId}/token`,
      data: { params },
    });

    return data;
  }

  async setToken(params: {
    connectionPayload: CONNECTION_PAYLOAD;
    emailAccountId: number;
    emailAccountPayloadId?: number;
  }): Promise<void> {
    const { connectionPayload, emailAccountId, emailAccountPayloadId } = params;
    try {
      await this.axiosService.post({
        url: `${this.appConfigService.shCoreBaseUrl}${this.appConfigService.shTokenManagerBaseUrl}/api/v1/user/${emailAccountId}/token`,
        data: { payload: connectionPayload, emailAccountPayloadId },
      });
    } catch (e) {}
  }

  async schedulerEvent(type: string, data?: Record<string, any>) {
    try {
      await this.axiosService.post({
        url: `${this.appConfigService.shCoreBaseUrl}${this.appConfigService.shSchedulerEventQueueBaseUrl}/event`,
        data: { type, data },
      });
    } catch (error) {}
  }

  async propagateRenewSuccess(shAccountId: number) {
    try {
      await this.axiosService.post({
        url: `${this.appConfigService.shCoreBaseUrl}${this.appConfigService.shSequenceManagerBaseUrl}/subscription-renewed`,
        data: { shAccountId },
      });
    } catch (err) {}
  }
}
