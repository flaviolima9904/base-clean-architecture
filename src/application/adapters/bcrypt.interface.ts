export interface IBcryptService {
  compare(hash: string, value: string): Promise<boolean>;
  hash(value: string): Promise<string>;
}
