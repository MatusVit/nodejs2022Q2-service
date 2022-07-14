import { CreateUserDto } from './../user/dto/create-user.dto';
import { IUser } from 'src/interfaces/user.interface';
import { UserEntity } from 'src/user/entities/user.entity';

export interface IUserStore {
  create: (createUserDto: CreateUserDto) => UserEntity;
  getAll: () => UserEntity[];
  get: (id: string) => UserEntity | null;
  update: (user: IUser) => UserEntity | null;
  delete: (id: string) => UserEntity | null;
}
