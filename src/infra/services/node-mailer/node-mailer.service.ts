import { LoggerService } from '@infra/logger/logger.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import {
  IMailerService,
  IMailerOptions,
} from '@application/adapters/mailer.interface';
import { EnvConfigService } from '@infra/config/env-config/env.config.service';

@Injectable()
export class NodeMailerService implements IMailerService {
  private readonly _logger = new Logger(NodeMailerService.name);

  constructor(
    private readonly _mailerService: MailerService,
    protected logger: LoggerService,
    private _envConfigService: EnvConfigService,
  ) {
    this.logger.setContext('NodeMailerService');
  }
  async sendMail(mail: IMailerOptions): Promise<any> {
    try {
      const sended = await this._mailerService.sendMail({
        ...mail,
        from: mail?.from || this._envConfigService.getMailFrom(),
      });

      this._logger.log(`E-mail enviado > ${mail.subject}`);

      return sended;
    } catch (error) {
      this._logger.error(
        `Erro ao enviar e-mail. Motivo: ${error?.message}`,
        error,
      );
      throw error;
    }
  }
}
