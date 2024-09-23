import { Injectable } from '@nestjs/common';
import { IBcryptService } from 'application/adapters/bcrypt.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService implements IBcryptService {
  public rounds = 10;

  async compare(hash: string, value: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, this.rounds);
  }
}
