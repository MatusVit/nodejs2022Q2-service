import { IArtist } from './../../interfaces/artist.interface';

export class Artist implements IArtist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
