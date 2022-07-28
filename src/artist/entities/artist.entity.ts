import { Exclude } from 'class-transformer';
import { IArtist } from './../../interfaces/artist.interface';

export class Artist implements IArtist {
  id: string;

  name: string;

  grammy: boolean;

  @Exclude()
  isFavorite: boolean;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
