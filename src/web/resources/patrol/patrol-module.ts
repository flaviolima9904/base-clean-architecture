import { Module } from '@nestjs/common';
import { LoggerModule } from '@infra/logger/logger.module';
import { UseCasesProxyModule } from '@infra/proxy/use-cases-proxy/use-cases-proxy.module';
import { CreatePatrolController } from './create-patrol/create-patrol.controller';

@Module({
  imports: [LoggerModule, UseCasesProxyModule.register()],
  controllers: [CreatePatrolController],
})
export class PatrolModule {}
