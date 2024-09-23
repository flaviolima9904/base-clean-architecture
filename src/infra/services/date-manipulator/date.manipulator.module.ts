import { Module } from '@nestjs/common';
import { IDateManipulatorService } from '@application/adapters/date-manipulator.interface';
import { DateManipulatorService } from './date-manipulator.service';

@Module({
  providers: [
    { provide: IDateManipulatorService, useClass: DateManipulatorService },
  ],
  exports: [IDateManipulatorService],
})
export class DateManipulatorModule {}
