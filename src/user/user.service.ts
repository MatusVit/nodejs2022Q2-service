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

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const timestamp = new Date().toISOString();
    const user = await this.prisma.user.create({
      data: { ...createUserDto, createdAt: timestamp, updatedAt: timestamp },
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

    if (updateUser.password !== updatePasswordDto.oldPassword)
      throw new ForbiddenException(MESSAGE.PASSWORD_WRONG);

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        password: updatePasswordDto.newPassword,
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
