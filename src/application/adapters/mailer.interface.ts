export interface IMailerOptions {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}
export interface IMailerService {
  sendMail(mail: IMailerOptions): Promise<any>;
}

export const IMailerService = Symbol('IMailerService');
