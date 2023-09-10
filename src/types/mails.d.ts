export interface sendMailType {
  to: string;
  subject: string;
  html?: string;
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
