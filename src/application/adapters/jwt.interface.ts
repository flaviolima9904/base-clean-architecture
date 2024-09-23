export interface IJwtServicePayload {
  username: string;
}

export interface IJwtService {
  verifyToken(token: string): Promise<any>;
  createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn?: string,
  ): Promise<string>;
}
