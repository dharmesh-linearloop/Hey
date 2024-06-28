import { STATUS_ENUM } from 'src/keys';

export const AgencyEmailVerificationCreditUsageMessages = {
  NOT_FOUND: 'Agency Email Verification Credit Usage not found.',
  SESSION_NOT_FOUND:
    'Agency Email Verification Credit Usage Session not found.',
  ALREADY_DISABLED:
    'Agency Email Verification Credit Usage is already disabled.',
  DISABLED: 'Agency Email Verification Credit Usage is disabled.',
  ALREADY_ENABLED: 'Agency Email Verification Credit Usage is already enabled.',
  ENABLED: 'Agency Email Verification Credit Usage is enabled.',
  ALREADY_DELETED: 'Agency Email Verification Credit Usage is already deleted.',
  DELETED: 'Agency Email Verification Credit Usage is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
