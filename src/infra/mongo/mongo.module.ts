import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfigModule } from '../config/env-config/env-config.module';
import { EnvConfigService } from '../config/env-config/env.config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: (config: EnvConfigService) => {
        return {
          uri: config.getMongoUrl(),
          user: config.getMongoUser(),
          pass: config.getMongoPassword(),
          connectTimeoutMS: 60000,
          socketTimeoutMS: 75000,
          maxPoolSize: 200,
        };
      },
    }),
  ],
})
export class MongoModule {}
