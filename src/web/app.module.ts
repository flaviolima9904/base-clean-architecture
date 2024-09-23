import { Module } from '@nestjs/common';
import { EnvConfigModule } from '@infra/config/env-config/env-config.module';
import { MongoModule } from '@infra/mongo/mongo.module';
import { DateManipulatorModule } from '@infra/services/date-manipulator/date.manipulator.module';
import { SocketModule } from '@infra/socket/socket.module';
import { NodeMailerModule } from '@infra/services/node-mailer/node-mailer.module';
import { JwtTokenModule } from '@infra/services/jwt/jwt.module';
import { BcryptModule } from '@infra/services/bcrypt/bcrypt.module';
import { LoggerModule } from '@infra/logger/logger.module';
import { AuthModule } from './resources/auth/auth.module';
import { AppGateway } from './app.gateway';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    EnvConfigModule,
    SocketModule,
    // MongoModule,
    LoggerModule,
    DateManipulatorModule,
    // NodeMailerModule,
    JwtTokenModule,
    BcryptModule,
    AuthModule
  ],
  controllers: [],
  providers: [AppGateway, LocalStrategy, JwtStrategy],
})
export class AppModule {}
