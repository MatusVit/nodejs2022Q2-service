import { ITokens } from 'src/interfaces/auth.interface';

export class Tokens implements ITokens {
  accessToken: string;
  refreshToken: string;

  constructor(partial: Partial<Tokens>) {
    Object.assign(this, partial);
  }
}
