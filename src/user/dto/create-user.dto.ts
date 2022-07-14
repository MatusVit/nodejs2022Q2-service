import { ICreateUserDto } from './../../interfaces/user.interface';
import { IsString } from 'class-validator';

export class CreateUserDto implements ICreateUserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
