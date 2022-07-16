import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { IAlbum } from './../../interfaces/album.interface';

export class CreateAlbumDto implements IAlbum {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  artistId: string | null;
}
