import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import {
  INVITATION_SETTINGS,
  OTP_SETTINGS,
  RESET_PASSWORD_SETTINGS,
} from 'src/keys';
import {
  generateRandomOtp,
  generateRandomString,
  generateToken,
} from './common.helper';

@Injectable()
export class CommonService {
  generateOtp() {
    return {
      otp: generateRandomOtp(OTP_SETTINGS.OTP_LENGTH).toString(),
      otpRef: generateRandomString(OTP_SETTINGS.OTP_REF_LENGTH),
      otpExpiresAt: DateTime.utc()
        .plus({
          minutes: OTP_SETTINGS.OTP_EXPIRATION_LIMIT,
        })
        .toISO(),
    };
  }

  generateInvitationToken() {
    return {
      invitationToken: generateToken(INVITATION_SETTINGS.TOKEN_LENGTH),
      generatedAt: DateTime.utc().toISO(),
      expireAt: DateTime.utc()
        .plus({
          minutes: INVITATION_SETTINGS.EXPIRATION_LIMIT,
        })
        .toISO(),
    };
  }

  generateResetPasswordToken() {
    return {
      resetPasswordToken: generateToken(RESET_PASSWORD_SETTINGS.TOKEN_LENGTH),
      generatedAt: DateTime.utc().toISO(),
      expireAt: DateTime.utc()
        .plus({
          minutes: RESET_PASSWORD_SETTINGS.EXPIRATION_LIMIT,
        })
        .toISO(),
    };
  }
}
