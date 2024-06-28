import { Injectable } from '@nestjs/common';
import { PostmarkService } from '../postmark/postmark.service';

@Injectable()
export class EmailService {
  constructor(private postmarkService: PostmarkService) {}

  async sendOTP(params: { to: string; otp: string; firstName: string }) {
    const { to, otp, firstName } = params;

    await this.postmarkService.sendMail({
      to,
      subject: `Your admin panel login OTP is ${otp}`,
      htmlBody: `Hi ${firstName}<br><br>
      Please use ${otp} to log into Saleshandy admin panel.<br><br>
      If you didn’t request it, kindly report it to the Saleshandy team.<br><br>
      Thanks,<br>
      Saleshandy Team<br>
      `,
    });

    return true;
  }

  async sendTokenUrl(params: { to: string; url: string; firstName: string }) {
    const { to, url, firstName } = params;

    await this.postmarkService.sendMail({
      to,
      subject: `SH Admin Panel Authentication URL`,
      htmlBody: `Hi ${firstName}<br><br>
      Please use this URL: <a href="${url}">${url}</a> to log into Saleshandy admin panel.<br><br>
      If you didn’t request it, kindly report it to the Saleshandy team.<br><br>
      Thanks,<br>
      Saleshandy Team<br>
      `,
    });

    return true;
  }
}
