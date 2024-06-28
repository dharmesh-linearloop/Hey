import { STATUS_ENUM } from 'src/keys';

export const ScheduleMessages = {
  NOT_FOUND: 'Schedule not found.',
  SESSION_NOT_FOUND: 'Schedule Session not found.',
  ALREADY_DISABLED: 'Schedule is already disabled.',
  DISABLED: 'Schedule is disabled.',
  ALREADY_ENABLED: 'Schedule is already enabled.',
  ENABLED: 'Schedule is enabled.',
  ALREADY_DELETED: 'Schedule is already deleted.',
  DELETED: 'Schedule is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
