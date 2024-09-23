import { Response } from 'express';
import { LoggerService } from '@infra/logger/logger.service';

export abstract class BaseController {
  constructor(protected logger: LoggerService) {}

  public fail = (res: Response, error: Error | any) => {
    console.log(error)
    this.logger.error(`REQUEST ERROR > ${error?.message}`, { error });

    res.status(error?.statusCode || error?.status || 500).json({
      message: error?.message || 'Internal server error',
    });
    res.end();
  };

  public ok<T>(res: Response, data?: T) {
    res.status(200).json(data);
    res.end();
  }

  public created(res: Response) {
    res.status(201);
    res.end();
  }
}
