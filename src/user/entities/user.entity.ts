import { Exclude } from 'class-transformer';
import { IUser } from 'src/interfaces/user.interface';

export class UserEntity implements IUser {
  id: string;

  login: string;

  @Exclude()
  password: string;

  version: number;

  createdAt: number;

  updatedAt: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
