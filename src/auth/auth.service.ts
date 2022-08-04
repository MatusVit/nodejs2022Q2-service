import { Tokens } from './entities/tokens.entity';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { MESSAGE, MESSAGE_NOT_EXIST } from './../constants/massages';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

import { plainToInstance } from 'class-transformer';
import { Message } from './entities/message.entity';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from 'src/interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signup(dto: AuthDto): Promise<Message> {
    const hash = await this.getHash(dto.password);
    const timestamp = new Date().toISOString();
    await this.prisma.user.create({
      data: {
        ...dto,
        password: hash,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    });

    return plainToInstance(Message, {
      massage: `${dto.login} ${MESSAGE.USER_REGISTERED}`,
    });
  }

  async login(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: { login: dto.login },
    });
    if (!user) throw new ForbiddenException(MESSAGE.BAD_LOGIN_USER);

    const isCorrectPassword = await bcrypt.compare(dto.password, user.password);
    if (!isCorrectPassword) throw new ForbiddenException(MESSAGE.BAD_PASSWORD);

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async refresh(userId: string, refreshToken: string): Promise<Tokens> {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
    });
    if (!user) throw new UnauthorizedException(MESSAGE.USER_NOT_EXIST);

    const isCorrectRefreshToken = refreshToken === user.refreshToken;
    if (!isCorrectRefreshToken)
      throw new UnauthorizedException(MESSAGE.BAD_REFRESH_TOKEN);

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  private async getHash(password) {
    return await bcrypt.hash(password, +process.env.CRYPT_SALT);
  }

  private async getTokens(userId: string, login: string) {
    const payload: IJwtPayload = { userId, login };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: `${process.env.JWT_SECRET_ACCESS_KEY}`,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: `${process.env.JWT_SECRET_REFRESH_KEY}`,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    ]);

    return plainToInstance(Tokens, { accessToken, refreshToken });
  }
}
