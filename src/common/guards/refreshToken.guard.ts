import { ExecutionContext, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { STRATEGY_NAME } from 'src/constants/commons';

export class RefreshTokenGuard extends AuthGuard(STRATEGY_NAME.REFRESH_JWT) {}
