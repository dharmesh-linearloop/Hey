import { STATUS_ENUM } from 'src/keys';

export const SequenceSettingMessages = {
  NOT_FOUND: 'Sequence Setting not found.',
  SESSION_NOT_FOUND: 'Sequence Setting Session not found.',
  ALREADY_DISABLED: 'Sequence Setting is already disabled.',
  DISABLED: 'Sequence Setting is disabled.',
  ALREADY_ENABLED: 'Sequence Setting is already enabled.',
  ENABLED: 'Sequence Setting is enabled.',
  ALREADY_DELETED: 'Sequence Setting is already deleted.',
  DELETED: 'Sequence Setting is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
