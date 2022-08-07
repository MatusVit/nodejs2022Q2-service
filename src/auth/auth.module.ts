import { AccessTokenGuard } from './../common/guards/accessToken.guard';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { LoggingModule } from 'src/logging/logging.module';

@Module({
  imports: [JwtModule.register({}), LoggingModule],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
