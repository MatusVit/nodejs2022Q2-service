import { InMemoryUserStore } from './../store/users.store';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly store: InMemoryUserStore) {}

  async create(createUserDto: CreateUserDto) {
    return this.store.create(createUserDto);
    // return 'This action adds a new user';
  }

  findAll() {
    // return `This action returns all users`;
    return this.store.getAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
