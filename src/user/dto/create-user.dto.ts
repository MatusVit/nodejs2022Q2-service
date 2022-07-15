import { ICreateUserDto } from './../../interfaces/user.interface';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto implements ICreateUserDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
