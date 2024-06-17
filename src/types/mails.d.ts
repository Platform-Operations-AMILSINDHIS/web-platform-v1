import type { Attachment } from "nodemailer/lib/mailer";

export interface SendMailType {
  to: string;
  subject: string;
  html: string;
  attachments?: Attachment[];
}

export interface RSVPMailType {
  to: string;
  eventTitle: string;
  eventDate: Date;
}

export interface ConfirmationMailType {
  to: string;
  formName: string;
}

export interface DecisionMailType {
  to: string;
  descision: boolean;
  formType: string;
  membershipID?: string;
}

export interface MatrimonyDecisionMailType {
  to: string;
  descision: boolean;
  matrimonyID?: string;
}

export interface DonationFormConfirmationMailType {
  amount: number;
  donorName: string;
  contactNumber: string;
  email: string;
}

export interface DeclineProfileRequestMail {
  to: string;
  requested_name: string;
  requested_MatID: string;
}
