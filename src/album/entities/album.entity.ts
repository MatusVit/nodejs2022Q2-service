import { Exclude } from 'class-transformer';
import { IAlbum } from './../../interfaces/album.interface';

export class Album implements IAlbum {
  id: string;

  name: string;

  year: number;

  artistId: string | null;

  @Exclude()
  isFavorite: boolean;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
