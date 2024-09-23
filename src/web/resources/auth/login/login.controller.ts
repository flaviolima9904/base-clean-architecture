import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { LoginDTO } from './login.dto';
import { Response } from 'express';
import { BaseController } from 'web/bases/base.controller';
import { JwtTokenService } from '@infra/services/jwt/jwt.service';
import { LoggerService } from '@infra/logger/logger.service';
import { EnvConfigService } from 'infra/config/env-config/env.config.service';
import { LocalGuard } from '@web/guards/local.guard';

@Controller()
export class LoginController extends BaseController {
  constructor(
    protected loggerService: LoggerService,
    private readonly _jwtService: JwtTokenService,
    private readonly _envConfigService: EnvConfigService,
  ) {
    super(loggerService);
    this.loggerService.setContext('LoginController');
  }

  @Post('/login')
  @UseGuards(LocalGuard)
  async login(@Body() loginDto: LoginDTO, @Res() response: Response) {
    try {
      const accessToken = await this._jwtService.createToken(
        {
          username: loginDto.username,
        },
        this._envConfigService.getJwtSecret(),
      );
      this.ok(response, { access_token: accessToken, type: 'Bearer' });
    } catch (error) {
      this.fail(response, error);
    }
  }
}
