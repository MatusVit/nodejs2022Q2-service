import { Exclude } from 'class-transformer';
import { ITrack } from 'src/interfaces/track.interface';

export class Track implements ITrack {
  id: string;

  name: string;

  artistId: string | null;

  albumId: string | null;

  duration: number;

  @Exclude()
  isFavorite: boolean;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
