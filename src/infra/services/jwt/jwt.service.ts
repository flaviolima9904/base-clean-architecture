import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  IJwtService,
  IJwtServicePayload,
} from '@application/adapters/jwt.interface';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private _jwtService: JwtService) {}
  async createToken(
    payload: IJwtServicePayload,
    secret: string,
  ): Promise<string> {
    return await this._jwtService.signAsync(payload, { secret });
  }

  async verifyToken(token: string): Promise<any> {
    return this._jwtService.verifyAsync(token);
  }
}
