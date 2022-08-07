import { UserEntity } from 'src/user/entities/user.entity';
import { MESSAGE } from './../constants/massages';
import { UpdatePasswordDto } from './dto/update-password.dto';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { compareData, getHash } from 'src/common/utils/hash.utils';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const hash = await getHash(dto.password);
    const timestamp = new Date().toISOString();
    const user = await this.prisma.user.create({
      data: {
        ...dto,
        password: hash,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    });
    return plainToInstance(UserEntity, user);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => plainToInstance(UserEntity, user));
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) throw new NotFoundException(MESSAGE.USER_NOT_EXIST);
    return plainToInstance(UserEntity, user);
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const updateUser = await this.prisma.user.findFirst({ where: { id } });

    if (!updateUser) throw new NotFoundException(MESSAGE.USER_NOT_EXIST);

    const isCorrectPassword = await compareData(
      updatePasswordDto.oldPassword,
      updateUser.password,
    );
    if (!isCorrectPassword)
      throw new ForbiddenException(MESSAGE.PASSWORD_WRONG);

    const hash = await getHash(updatePasswordDto.newPassword);
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        password: hash,
        version: { increment: 1 },
      },
    });
    return plainToInstance(UserEntity, user);
  }

  async remove(id: string): Promise<void> {
    const deleteUser = await this.prisma.user.findFirst({ where: { id } });
    if (!deleteUser) throw new NotFoundException(MESSAGE.USER_NOT_EXIST);
    await this.prisma.user.delete({ where: { id } });
    return;
  }
}
