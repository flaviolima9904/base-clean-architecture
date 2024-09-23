import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { LoggerService } from '@infra/logger/logger.service';
import { Strategy } from 'passport-local';
import { EnvConfigService } from '@infra/config/env-config/env.config.service';
import { BcryptService } from '@infra/services/bcrypt/bcrypt.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private _loggerService: LoggerService,
    private readonly _envConfigService: EnvConfigService,
    private readonly _bcryptService: BcryptService,
  ) {
    super();
    this._loggerService.setContext('LocalStrategy');
  }
  async validate(username: string, password: string): Promise<any> {
    const isUser = username === this._envConfigService.getApiUsername();
    const isPassword = await this._bcryptService.compare(
      this._envConfigService.getApiHashPass(),
      password,
    );

    if (!isUser || !isPassword) {
      this._loggerService.warn(`Username or password is invalid`);
      throw new UnauthorizedException();
    }
    return { username };
  }
}
