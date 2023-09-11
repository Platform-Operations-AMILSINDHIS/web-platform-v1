import type { Attachment } from "nodemailer/lib/mailer";

export interface SendMailType {
  to: string;
  subject: string;
  html: string;
  attachments?: Attachment[];
}

export interface ConfirmationMailType {
  to: string;
  formName: string;
}

export interface RSVPMailType {
  to: string;
  eventTitle: string;
  eventDate: Date;
}
