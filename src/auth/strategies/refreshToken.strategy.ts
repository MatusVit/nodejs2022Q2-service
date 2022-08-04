import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { STRATEGY_NAME } from 'src/constants/commons';
import { IJwtPayload } from 'src/interfaces/auth.interface';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  STRATEGY_NAME.REFRESH_JWT,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: process.env.JWT_SECRET_REFRESH_KEY,
      passReqToCallback: true,
    });
  }

  validate(payload: IJwtPayload) {
    return payload;
  }
}
