import { Tokens } from './entities/tokens.entity';
import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, Post, HttpStatus } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { Message } from './entities/message.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  async signup(@Body() dto: AuthDto): Promise<Message> {
    return await this.authService.signup(dto);
  }

  @Post('/login')
  async login(@Body() dto: AuthDto): Promise<Tokens> {
    // Server should answer with status code 200 and tokens if dto is valid
    // Server should answer with status code 400 and corresponding message if dto is invalid (no login or password, or they are not a strings)
    // Server should answer with status code 403 and corresponding message if authentication failed (no user with such login, password doesn't match actual one, etc.)
    return await this.authService.login(dto);
  }

  @Post('/refresh ')
  async refresh() {
    // Server should answer with status code 200 and tokens in body if dto is valid
    // Server should answer with status code 401 and corresponding message if dto is invalid (no refreshToken in body)
    // Server should answer with status code 403 and corresponding message if authentication failed (Refresh token is invalid or expired)
    return await this.authService.refreshToken();
  }
}
