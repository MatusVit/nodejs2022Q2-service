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
import { RefreshDto } from './dto/refresh.dto';
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
  async refresh(@Req() req: Request, @Body() dto: RefreshDto): Promise<Tokens> {
    // Server should answer with status code 200 and tokens in body if dto is valid
    // TODO *** 401 and 403
    // Server should answer with status code 401 and corresponding message if dto is invalid (no refreshToken in body)
    // Server should answer with status code 403 and corresponding message if authentication failed (Refresh token is invalid or expired)
    const userId = req.user['userId'];
    return await this.authService.refresh(userId, dto.refreshToken);
  }
}
