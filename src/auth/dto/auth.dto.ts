import { ICreateUserDto } from '../../interfaces/user.interface';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto implements ICreateUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
