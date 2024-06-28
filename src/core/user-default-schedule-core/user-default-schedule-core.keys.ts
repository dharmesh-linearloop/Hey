import { STATUS_ENUM } from 'src/keys';

export const UserDefaultScheduleMessages = {
  NOT_FOUND: 'User Default Schedule not found.',
  SESSION_NOT_FOUND: 'User Default Schedule Session not found.',
  ALREADY_DISABLED: 'User Default Schedule is already disabled.',
  DISABLED: 'User Default Schedule is disabled.',
  ALREADY_ENABLED: 'User Default Schedule is already enabled.',
  ENABLED: 'User Default Schedule is enabled.',
  ALREADY_DELETED: 'User Default Schedule is already deleted.',
  DELETED: 'User Default Schedule is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
