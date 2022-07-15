import { IUpdatePasswordDto } from './../../interfaces/user.interface';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto implements IUpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string; // previous password

  @IsNotEmpty()
  @IsString()
  newPassword: string; // new password
}
