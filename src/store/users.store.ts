import { IUserStore } from 'src/interfaces/user-store.interface';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { IUser } from 'src/interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from 'src/user/entities/user.entity';

// @Injectable()
export class InMemoryUserStore implements IUserStore {
  private readonly users: UserEntity[] = [];

  create({ login, password }: CreateUserDto): UserEntity {
    const newUser = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return newUser;
  }

  getAll(): UserEntity[] {
    return this.users;
  }

  get(id: string): UserEntity {
    const user = this.users.find(({ id: userId }) => userId === id);
    return user || null;
  }

  update(user: IUser): UserEntity {
    const index = this.users.findIndex(({ id: userId }) => userId === user.id);
    if (index < 0) return null;
    const updateUser = this.users[index];
    this.users[index] = {
      ...updateUser,
      ...user,
      version: updateUser.version + 1,
      updatedAt: Date.now(),
    };
    return this.users[index];
  }

  delete(id: string): UserEntity {
    const index = this.users.findIndex(({ id: userId }) => userId === id);
    if (index < 0) return null;
    const deleteUser = this.users.splice(index, 1);
    return deleteUser[0];
  }
}
