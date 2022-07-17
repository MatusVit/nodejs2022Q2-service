import { ICreateUserDto } from './../../interfaces/user.interface';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto implements ICreateUserDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
