import { IDateManipulatorService } from '@application/adapters/date-manipulator.interface';
import { Injectable } from '@nestjs/common';
import { format as dateFnsFormat, parseISO } from 'date-fns';

@Injectable()
export class DateManipulatorService implements IDateManipulatorService {
  format(date: number | Date | string, format: string): string {
    if (typeof date === 'string') {
      return dateFnsFormat(parseISO(date), format);
    }
    return dateFnsFormat(date, format);
  }
}
