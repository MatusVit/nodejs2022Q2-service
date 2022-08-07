import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { IFavorites, IFavoritesResponse } from 'src/interfaces/favs.interface';
import { Track } from 'src/track/entities/track.entity';

export class Favorites implements IFavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];

  constructor(partial: Partial<Favorites>) {
    Object.assign(this, partial);
  }
}

export class FavoriteIds implements IFavorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids

  constructor(partial: Partial<FavoriteIds>) {
    Object.assign(this, partial);
  }
}
