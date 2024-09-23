import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerConfig } from '@application/config/mailer-config.interface';
@Injectable()
export class EnvConfigService implements MailerConfig {
  constructor(private _configService: ConfigService) {}

  getNodeENV(): string {
    return this._configService.get<string>('NODE_ENV');
  }

  getMongoUrl(): string {
    return this._configService.get<string>('MONGO_DB_URL');
  }

  getMongoUser(): string {
    return this._configService.get<string>('MONGO_DB_USER');
  }

  getMongoPassword(): string {
    return this._configService.get<string>('MONGO_DB_PASS');
  }

  getMailHost(): string {
    return this._configService.get<string>('MAIL_HOST');
  }

  getMailPort(): number {
    return this._configService.get<number>('MAIL_PORT');
  }

  getMailAuthUser(): string {
    return this._configService.get<string>('MAIL_AUTH_USER');
  }

  getMailAuthPass(): string {
    return this._configService.get<string>('MAIL_AUTH_PASS');
  }

  getMailFrom(): string {
    return this._configService.get<string>('MAIL_FROM');
  }

  getEnableSendMail(): boolean {
    return ['true', 'TRUE'].includes(
      this._configService.get<string>('MAIL_ENABLE_SEND'),
    );
  }

  getJwtSecret(): string {
    return this._configService.get<string>('JWT_SECRET');
  }

  getApiUsername(): string {
    return this._configService.get<string>('API_USERNAME');
  }

  getApiHashPass(): string {
    return this._configService.get<string>('API_HASH_PASS');
  }
}
