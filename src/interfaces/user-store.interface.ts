import { UpdatePasswordDto } from './../user/dto/update-password.dto';
import { STORE_CODE } from './../constants/commons';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';

export interface IUserStore {
  create: (createUserDto: CreateUserDto) => UserEntity;
  getAll: () => UserEntity[];
  get: (id: string) => UserEntity | null;
  updatePassword: (
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ) => UserEntity | null | STORE_CODE;
  delete: (id: string) => UserEntity | null;
}
