import { STATUS_ENUM } from 'src/keys';

export const SequenceStepVariantMessages = {
  NOT_FOUND: 'Sequence Step Variant not found.',
  SESSION_NOT_FOUND: 'Sequence Step Variant Session not found.',
  ALREADY_DISABLED: 'Sequence Step Variant is already disabled.',
  DISABLED: 'Sequence Step Variant is disabled.',
  ALREADY_ENABLED: 'Sequence Step Variant is already enabled.',
  ENABLED: 'Sequence Step Variant is enabled.',
  ALREADY_DELETED: 'Sequence Step Variant is already deleted.',
  DELETED: 'Sequence Step Variant is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
