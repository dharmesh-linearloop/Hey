import { STATUS_ENUM } from 'src/keys';

export const EmailVerificationCreditUsageMessages = {
  NOT_FOUND: 'Email Verification Credit Usage not found.',
  SESSION_NOT_FOUND: 'Email Verification Credit Usage Session not found.',
  ALREADY_DISABLED: 'Email Verification Credit Usage is already disabled.',
  DISABLED: 'Email Verification Credit Usage is disabled.',
  ALREADY_ENABLED: 'Email Verification Credit Usage is already enabled.',
  ENABLED: 'Email Verification Credit Usage is enabled.',
  ALREADY_DELETED: 'Email Verification Credit Usage is already deleted.',
  DELETED: 'Email Verification Credit Usage is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
