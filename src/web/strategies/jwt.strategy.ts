import { PassportStrategy } from '@nestjs/passport';
import { EnvConfigService } from '@infra/config/env-config/env.config.service';
import { LoggerService } from '@infra/logger/logger.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private _loggerService: LoggerService,
    private readonly _envConfigService: EnvConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _envConfigService.getJwtSecret(),
    });

    this._loggerService.setContext('JwtStrategy');
  }

  async validate(payload: any) {
    const isUser = payload.username === this._envConfigService.getApiUsername();

    if (!isUser) {
      this._loggerService.warn(`User not found`);
      throw new UnauthorizedException();
    }

    return payload;
  }
}
