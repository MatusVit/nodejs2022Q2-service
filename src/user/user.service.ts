import { STORE_CODE } from './../constants/commons';
import { MESSAGE } from './../constants/massages';
import { InMemoryUserStore } from './../store/users.store';
import { UpdatePasswordDto } from './dto/update-password.dto';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  // constructor(private prisma: PrismaService) {}
  // async createUser(data: Prisma.UserCreateInput): Promise<User> {
  //   return this.prisma.user.create({
  //     data,
  //   });
  // }

  constructor(private readonly store: InMemoryUserStore) {}
  async create(createUserDto: CreateUserDto) {
    return this.store.create(createUserDto);
  }
  findAll() {
    return this.store.getAll();
  }
  findOne(id: string) {
    const user = this.store.get(id);
    if (!user) throw new NotFoundException(MESSAGE.USER_NOT_EXIST);
    return user;
  }
  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.store.updatePassword(id, updatePasswordDto);
    if (!user) throw new NotFoundException(MESSAGE.USER_NOT_EXIST);
    if (user === STORE_CODE.PASSWORD_WRONG)
      throw new ForbiddenException(MESSAGE.PASSWORD_WRONG);
    return user;
  }
  remove(id: string): void {
    const user = this.store.delete(id);
    if (!user) throw new NotFoundException(MESSAGE.USER_NOT_EXIST);
    return;
  }
}
