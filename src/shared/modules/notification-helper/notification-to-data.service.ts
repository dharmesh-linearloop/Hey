import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationToDataService {
  async getNotificationToEmails(notification: any, userEmails = []) {
    const toEmails = [
      ...new Set(userEmails?.concat(notification.toEmails)),
    ].join(',');

    return toEmails;
  }

  async getNotificationToSms(notification: any, userPhoneNumbers = []) {
    const toPhoneNumbers = [
      ...new Set(userPhoneNumbers?.concat(notification.toPhoneNumbers)),
    ].join(',');

    return toPhoneNumbers;
  }

  async getNotificationToMagicBellUsers(
    notification: any,
    magicBellUsers = [],
  ) {
    const toMagicBellUsers = [
      ...new Set(magicBellUsers?.concat(notification.toMagicBellUsers)),
    ].join(',');

    return toMagicBellUsers;
  }

  async getNotificationToDeviceTokens(
    notification: any,
    userDeviceTokens = [],
  ) {
    const toDeviceTokens = [
      ...new Set(userDeviceTokens?.concat(notification.toDeviceTokens)),
    ].join(',');

    return toDeviceTokens;
  }
}
