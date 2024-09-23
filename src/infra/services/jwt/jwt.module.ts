import { Module } from '@nestjs/common';
import { JwtModule as jwt } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';

@Module({
  imports: [jwt.register({ secret: process.env.JWT_SECRET })],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtTokenModule {}
