export type EmailPayload = {
  to: string;
  cc?: string;
  bcc?: string;
  subject?: string;
  templateId?: number;
  htmlBody?: string;
  textBody?: string;
  templateAlias?: string;
  templateModel?: Record<string, unknown>;
  attachments?: Array<AttachmentJSON>;
};

// export type AttachmentJSON = {
//   content: string;
//   filename: string;
//   type?: string;
//   disposition?: string;
//   content_id?: string;
// };

export type AttachmentJSON = {
  Name: string;
  ContentID: string | null;
  Content: string;
  ContentType: string;
  ContentLength?: number;
};

export type FirebasePayload = {
  deviceToken: string | string[];
  title?: string;
  message?: string;
  dynamicData?: any;
};

export type MagicBellPayload = {
  external_id?: string;
  title?: string;
  content?: string;
  action_url?: string;
  custom_attributes: Record<string, unknown>;
  category?: string;
  topic?: string;
  dynamicData?: any;
};

export type SMSPayload = {
  from?: string;
  to: string;
  body: string;
};

// export type CreateNotificationTriggerAndQueueParams = {
//   notification: Notification;
//   delay: number;
//   notificationData: Record<string, unknown>;
//   additionalDataObj: any;
// };
