export class CreatePatrolUseCase {
  constructor() {}

  async exec(): Promise<CreatePatrolUseCase.Response> {}
}

export namespace CreatePatrolUseCase {
  export interface Params {
    name: string;
    type: string;
    path: number[];
  }
  export type Response = void;
}
