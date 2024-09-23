export interface IDateManipulatorService {
  format(date: number | Date | string, format: string): string;
}
export const IDateManipulatorService = Symbol('IDateManipulatorService');