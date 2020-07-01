export interface SendEmailI {
  to_mailer: string;
  subject_mailer: string;
  text?: string;
  html?: string;
}
