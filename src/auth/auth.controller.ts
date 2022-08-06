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
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { Message } from './entities/message.entity';
import { Request } from 'express';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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

  // @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request): Promise<Tokens> {
    const { body, user } = req;
    return await this.authService.refresh(user['userId'], body.refreshToken);
  }
}
