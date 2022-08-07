import { MESSAGE } from './../constants/massages';
import { RefreshTokenGuard } from './../common/guards/refreshToken.guard';
import { Tokens } from './entities/tokens.entity';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { Message } from './entities/message.entity';
import { Request } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { LoggingService } from 'src/logging/logging.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService, // private logger: LoggingService, // ***
  ) {
    // this.logger.setContext(AuthController.name); // ***
  }

  @Public()
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: AuthDto): Promise<Message> {
    return await this.authService.signup(dto);
  }

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthDto): Promise<Tokens> {
    return await this.authService.login(dto);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request): Promise<Tokens> {
    const { body, user } = req;

    if (Date.now() >= user['exp'] * 1000)
      throw new UnauthorizedException(MESSAGE.EXPIRED_REFRESH_TOKEN);

    return await this.authService.refresh(user['userId'], body.refreshToken);
  }
}
