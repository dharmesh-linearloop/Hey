import { STATUS_ENUM } from 'src/keys';

export const EmailLinkMessages = {
  NOT_FOUND: 'Email Link not found.',
  SESSION_NOT_FOUND: 'Email Link Session not found.',
  ALREADY_DISABLED: 'Email Link is already disabled.',
  DISABLED: 'Email Link is disabled.',
  ALREADY_ENABLED: 'Email Link is already enabled.',
  ENABLED: 'Email Link is enabled.',
  ALREADY_DELETED: 'Email Link is already deleted.',
  DELETED: 'Email Link is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
