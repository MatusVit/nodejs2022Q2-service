import { IUpdatePasswordDto } from './../../interfaces/user.interface';
import { IsString } from 'class-validator';

export class UpdatePasswordDto implements IUpdatePasswordDto {
  @IsString()
  oldPassword: string; // previous password

  @IsString()
  newPassword: string; // new password
}
