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
    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async refreshToken() {
    // todo ! ***
    return 'refreshToken';
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  private async getHash(password) {
    return await bcrypt.hash(password, +process.env.CRYPT_SALT);
  }

  private async getTokens(userId: string, login: string) {
    const payload = { userId, login };
    console.log(
      'process.env.JWT_SECRET_ACCESS_KEY = ',
      process.env.JWT_SECRET_ACCESS_KEY,
    ); // ! ***
    console.log(
      'process.env.JWT_SECRET_REFRESH_KEY = ',
      process.env.JWT_SECRET_REFRESH_KEY,
    ); // ! ***

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: `${process.env.JWT_SECRET_ACCESS_KEY}`,
        expiresIn: 60 * 60 * +process.env.TOKEN_EXPIRE_TIME_HOUR,
      }),
      this.jwtService.signAsync(payload, {
        secret: `${process.env.JWT_SECRET_REFRESH_KEY}`,
        expiresIn: 60 * 60 * +process.env.TOKEN_REFRESH_EXPIRE_TIME_HOUR,
      }),
    ]);
    console.log('accessToken, refreshToken', accessToken, refreshToken); // ! ***

    return plainToInstance(Tokens, { accessToken, refreshToken });
  }
}
