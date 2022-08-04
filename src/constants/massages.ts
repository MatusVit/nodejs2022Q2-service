import { TYPE_ENTITY } from './commons';

export const MESSAGE = {
  BAD_REFRESH_TOKEN: 'Refresh token is invalid or expired',
  USER_REGISTERED: 'user has been registered',
  BAD_LOGIN_USER: 'No user with such login',
  BAD_PASSWORD: 'Invalid password',
  USER_NOT_EXIST: `User doesn't exist`,
  ARTIST_NOT_EXIST: `Artist doesn't exist`,
  ALBUM_NOT_EXIST: `Album doesn't exist`,
  TRACK_NOT_EXIST: `Track doesn't exist`,
  PASSWORD_WRONG: `Old Password is wrong`,
  NOT_FAVORITE: `It is not favorite`,
};

export const MESSAGE_NOT_EXIST = {
  [TYPE_ENTITY.ALBUMS]: MESSAGE.ALBUM_NOT_EXIST,
  [TYPE_ENTITY.ARTISTS]: MESSAGE.ARTIST_NOT_EXIST,
  [TYPE_ENTITY.TRACKS]: MESSAGE.TRACK_NOT_EXIST,
};
