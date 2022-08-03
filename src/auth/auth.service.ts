import { Tokens } from './entities/tokens.entity';
import { Injectable } from '@nestjs/common';
import { MESSAGE } from './../constants/massages';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

import { plainToInstance } from 'class-transformer';
import { Message } from './entities/message.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  private async getHash(password) {
    return await bcrypt.hash(password, process.env.CRYPT_SALT);
  }

  private async getTokens(userId: string, login: string) {
    const payload = { userId, login };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({
        payload,
        option: {
          secret: process.env.JWT_SECRET_ACCESS_KEY,
          expiresIn: 60 * 60 * +process.env.TOKEN_EXPIRE_TIME_HOUR,
        },
      }),
      this.jwtService.signAsync({
        payload,
        option: {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: 60 * 60 * +process.env.TOKEN_REFRESH_EXPIRE_TIME_HOUR,
        },
      }),
    ]);
    return plainToInstance(Tokens, { accessToken, refreshToken });
  }

  async signup(dto: AuthDto): Promise<Message> {
    const hash = await this.getHash(dto.password);
    const timestamp = new Date().toISOString();
    const user = await this.prisma.user.create({
      data: {
        ...dto,
        password: hash,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    });
    console.log('signup USER=', user); // ! ***

    return plainToInstance(Message, {
      massage: `${dto.login} ${MESSAGE.USER_REGISTERED}`,
    });
  }

  async login(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.user.findFirst({
      where: { login: dto.login },
    });

    return await this.getTokens(user.id, user.login);
  }

  async refreshToken() {
    return 'refreshToken';
  }
}
