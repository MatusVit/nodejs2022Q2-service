import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IUser } from 'src/interfaces/user.interface';

export class UserEntity implements IUser {
  id: string;

  login: string;

  password: string;

  version: number;

  createdAt: number;

  updatedAt: number;
}
