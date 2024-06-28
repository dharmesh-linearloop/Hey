import { STATUS_ENUM } from 'src/keys';

export const TemplateAttachmentMessages = {
  NOT_FOUND: 'Template Attachment not found.',
  SESSION_NOT_FOUND: 'Template Attachment Session not found.',
  ALREADY_DISABLED: 'Template Attachment is already disabled.',
  DISABLED: 'Template Attachment is disabled.',
  ALREADY_ENABLED: 'Template Attachment is already enabled.',
  ENABLED: 'Template Attachment is enabled.',
  ALREADY_DELETED: 'Template Attachment is already deleted.',
  DELETED: 'Template Attachment is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
