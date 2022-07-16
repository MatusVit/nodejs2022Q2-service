import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { ITrack } from 'src/interfaces/track.interface';

export class CreateTrackDto implements ITrack {
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  artistId: string | null; // refers to Artist

  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  albumId: string | null; // refers to Album

  @IsNotEmpty()
  @IsNumber()
  duration: number; // integer number
}
