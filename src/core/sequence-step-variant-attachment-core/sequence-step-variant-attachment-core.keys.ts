import { STATUS_ENUM } from 'src/keys';

export const SequenceStepVariantAttachmentMessages = {
  NOT_FOUND: 'Sequence Step Variant Attachment not found.',
  SESSION_NOT_FOUND: 'Sequence Step Variant Attachment Session not found.',
  ALREADY_DISABLED: 'Sequence Step Variant Attachment is already disabled.',
  DISABLED: 'Sequence Step Variant Attachment is disabled.',
  ALREADY_ENABLED: 'Sequence Step Variant Attachment is already enabled.',
  ENABLED: 'Sequence Step Variant Attachment is enabled.',
  ALREADY_DELETED: 'Sequence Step Variant Attachment is already deleted.',
  DELETED: 'Sequence Step Variant Attachment is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
