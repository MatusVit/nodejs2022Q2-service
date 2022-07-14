import { IUser } from 'src/interfaces/user.interface';
import { ICreateUserDto } from './../../interfaces/user.interface';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class UserDto implements IUser {
  @IsUUID()
  id: string;

  @IsString()
  login: string;

  @IsString()
  password?: string;

  @IsNumber()
  version?: number; // integer number, increments on update

  @IsNumber()
  createdAt?: number; // timestamp of creation

  @IsNumber()
  updatedAt?: number; // timestamp of last update
}
