import { Tokens } from './entities/tokens.entity';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { MESSAGE } from './../constants/massages';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { Message } from './entities/message.entity';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from 'src/interfaces/auth.interface';
import { compareData, getHash } from 'src/common/utils/hash.utils';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signup(dto: AuthDto): Promise<Message> {
    const user = await this.prisma.user.findFirst({
      where: { login: dto.login },
    });
    if (user) throw new ForbiddenException(MESSAGE.NOT_UNIQUE_LOGIN);

    const hash = await getHash(dto.password);
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
    const user = await this.prisma.user.findFirst({
      where: { login: dto.login },
    });
    if (!user) throw new ForbiddenException(MESSAGE.BAD_LOGIN_USER);

    const isCorrectPassword = await compareData(dto.password, user.password);
    if (!isCorrectPassword) throw new ForbiddenException(MESSAGE.BAD_PASSWORD);

    return await this.getTokens(user.id, user.login);
  }

  async refresh(userId: string, refreshToken: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new UnauthorizedException(MESSAGE.USER_NOT_EXIST);

    const isCorrectRefreshToken = refreshToken === user.refreshToken;
    if (!isCorrectRefreshToken)
      throw new ForbiddenException(MESSAGE.BAD_REFRESH_TOKEN);

    return await this.getTokens(user.id, user.login);
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  private async createNewTokens(
    userId: string,
    login: string,
  ): Promise<Tokens> {
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

  private async getTokens(userId: string, login: string): Promise<Tokens> {
    const tokens = await this.createNewTokens(userId, login);
    await this.updateRefreshToken(userId, tokens.refreshToken);
    return tokens;
  }
}
