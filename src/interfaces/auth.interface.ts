export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IJwtPayload {
  userId: string;
  login: string;
}
