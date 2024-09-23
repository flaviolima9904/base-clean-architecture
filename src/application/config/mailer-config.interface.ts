export interface MailerConfig {
  getMailHost(): string;
  getMailPort(): number;
  getMailAuthUser(): string;
  getMailAuthPass(): string;
  getMailFrom(): string;
  getEnableSendMail(): boolean;
}
