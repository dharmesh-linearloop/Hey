import { Injectable } from '@nestjs/common';
import { EmailPayload } from 'src/shared/types/notifications.type';
import * as postmark from 'postmark';
import { AppConfigService } from '../../../app-config/app-config.service';

@Injectable()
export class PostmarkService {
  constructor(private appConfigService: AppConfigService) {}

  async sendEmailWithTemplate({
    to,
    templateId,
    templateModel,
    attachments,
  }: EmailPayload) {
    const POSTMARK_SECRET_KEY = this.appConfigService.postmarkSecretKey;
    const FROM_EMAIL = this.appConfigService.postmarkFromEmail;
    const FROM_EMAIL_NAME = this.appConfigService.postmarkFromName;

    const client = new postmark.ServerClient(POSTMARK_SECRET_KEY);

    return client.sendEmailWithTemplate({
      From: FROM_EMAIL_NAME ? `${FROM_EMAIL_NAME} ${FROM_EMAIL}` : FROM_EMAIL,
      To: to,
      TemplateId: templateId,
      TemplateModel: {
        ...templateModel,
      },
      Attachments: attachments,
    });
  }

  async sendMail({
    to,
    subject,
    htmlBody,
    textBody,
    attachments,
  }: EmailPayload) {
    const POSTMARK_SECRET_KEY = this.appConfigService.postmarkSecretKey;
    const FROM_EMAIL = this.appConfigService.postmarkFromEmail;
    const FROM_EMAIL_NAME = this.appConfigService.postmarkFromName;

    const client = new postmark.ServerClient(POSTMARK_SECRET_KEY);

    return client.sendEmail({
      From: FROM_EMAIL_NAME ? `${FROM_EMAIL_NAME} ${FROM_EMAIL}` : FROM_EMAIL,
      To: to,
      Subject: subject,
      HtmlBody: htmlBody,
      TextBody: textBody,
      Attachments: attachments,
      MessageStream: 'outbound',
    });
  }
}
