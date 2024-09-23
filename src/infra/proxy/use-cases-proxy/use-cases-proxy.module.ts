import { DynamicModule, Module } from '@nestjs/common';
import { MongoRepositoriesModule } from '@infra/mongo/repositories/mongo-repositores.module';
import { SocketModule } from '@infra/socket/socket.module';
import { DateManipulatorModule } from '@infra/services/date-manipulator/date.manipulator.module';
import { NodeMailerModule } from '@infra/services/node-mailer/node-mailer.module';
import { LoggerModule } from '@infra/logger/logger.module';

import { EnvConfigModule } from '@infra/config/env-config/env-config.module';
import { EnvConfigService } from '@infra/config/env-config/env.config.service';

@Module({
  imports: [
    EnvConfigModule,
    LoggerModule,
    SocketModule,
    // MongoRepositoriesModule,
    DateManipulatorModule,
    NodeMailerModule,
  ],
})
export class UseCasesProxyModule {
  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        // {
        //   inject: [NfeLocationRepository],
        //   provide: FindNfeLocationByNumberUseCase,
        //   useFactory: (nfeLocationRepo: NfeLocationRepository) => {
        //     return new ImpFindNfeLocationByNumberUseCase(nfeLocationRepo);
        //   },
        // },
      ],
      exports: [
        // FindNfeLocationByNumberUseCase,
      ],
    };
  }
}
