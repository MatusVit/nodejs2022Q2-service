import { STORE_CODE } from './../constants/commons';
import { UpdatePasswordDto } from './../user/dto/update-password.dto';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from 'src/user/entities/user.entity';
import { getTimeStamp } from 'src/utils/common';

// @Injectable()
export class InMemoryUserStore /* implements IUserStore */ {
  private readonly users: UserEntity[] = [];

  create({ login, password }: CreateUserDto): UserEntity {
    const newUser = new UserEntity({
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: getTimeStamp(),
      updatedAt: getTimeStamp(),
    });
    this.users.push(newUser);
    return newUser;
  }

  getAll(): UserEntity[] {
    return this.users;
  }

  get(id: string): UserEntity {
    const user = this.users.find(({ id: userId }) => userId === id);
    return user || null;
  }

  updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): UserEntity | STORE_CODE {
    const index = this.users.findIndex(({ id: userId }) => userId === id);
    const updateUser = this.users[index];

    if (index < 0) return null;

    if (updateUser.password !== updatePasswordDto.oldPassword)
      return STORE_CODE.PASSWORD_WRONG;

    updateUser.password = updatePasswordDto.newPassword;
    updateUser.version = updateUser.version + 1;
    updateUser.updatedAt = getTimeStamp();
    return updateUser;
  }

  delete(id: string): UserEntity {
    const index = this.users.findIndex(({ id: userId }) => userId === id);
    if (index < 0) return null;
    const deleteUser = this.users.splice(index, 1);
    return deleteUser[0];
  }
}
