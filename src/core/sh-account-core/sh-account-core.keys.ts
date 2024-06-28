import { STATUS_ENUM } from 'src/keys';

export const ShAccountMessages = {
  NOT_FOUND: 'Sh Account not found.',
  SESSION_NOT_FOUND: 'Sh Account Session not found.',
  ALREADY_DISABLED: 'Sh Account is already disabled.',
  DISABLED: 'Sh Account is disabled.',
  ALREADY_ENABLED: 'Sh Account is already enabled.',
  ENABLED: 'Sh Account is enabled.',
  ALREADY_DELETED: 'Sh Account is already deleted.',
  DELETED: 'Sh Account is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
