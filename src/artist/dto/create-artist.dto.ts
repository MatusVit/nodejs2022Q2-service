import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { IArtist } from './../../interfaces/artist.interface';

export class CreateArtistDto implements IArtist {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
