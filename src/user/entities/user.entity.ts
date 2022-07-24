import { Exclude, Transform } from 'class-transformer';
import { IUser } from 'src/interfaces/user.interface';
import { transformTimestamp } from 'src/utils/common';

export class UserEntity implements IUser {
  id: string;

  login: string;

  @Exclude()
  password: string;

  version: number;

  @Transform(({ value }) => transformTimestamp(value))
  createdAt: number;

  @Transform(({ value }) => transformTimestamp(value))
  updatedAt: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
