import { STATUS_ENUM } from 'src/keys';

export const EmailAccountCustomDomainMessages = {
  NOT_FOUND: 'Email Account Custom Domain not found.',
  SESSION_NOT_FOUND: 'Email Account Custom Domain Session not found.',
  ALREADY_DISABLED: 'Email Account Custom Domain is already disabled.',
  DISABLED: 'Email Account Custom Domain is disabled.',
  ALREADY_ENABLED: 'Email Account Custom Domain is already enabled.',
  ENABLED: 'Email Account Custom Domain is enabled.',
  ALREADY_DELETED: 'Email Account Custom Domain is already deleted.',
  DELETED: 'Email Account Custom Domain is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
