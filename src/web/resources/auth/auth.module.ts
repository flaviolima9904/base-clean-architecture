import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { JwtTokenModule } from '@infra/services/jwt/jwt.module';
import { LoggerModule } from '@infra/logger/logger.module';
import { EnvConfigModule } from '@infra/config/env-config/env-config.module';

@Module({
  imports: [JwtTokenModule, LoggerModule, EnvConfigModule],
  controllers: [LoginController],
})
export class AuthModule {}
