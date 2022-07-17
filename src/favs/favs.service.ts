import { Favorites } from './entities/fav.entity';
import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { InMemoryFavoritesStore } from 'src/store/favorites.store';
import { STORE_CODE, TYPE_ENTITY } from 'src/constants/commons';
import { MESSAGE } from 'src/constants/massages';

const SERVICE = {
  [TYPE_ENTITY.ALBUMS]: 'albumService',
  [TYPE_ENTITY.TRACKS]: 'trackService',
  [TYPE_ENTITY.ARTISTS]: 'artistService',
};

@Injectable()
export class FavsService {
  constructor(
    private readonly store: InMemoryFavoritesStore,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,

    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,

    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
  ) {}

  getAll(): Favorites {
    const favoriteIds = this.store.getAll();

    const albums = favoriteIds.albums.map((id) =>
      this.albumService.findOne(id),
    );

    const artists = favoriteIds.artists.map((id) =>
      this.artistService.findOne(id),
    );

    const tracks = favoriteIds.tracks.map((id) =>
      this.trackService.findOne(id),
    );

    const favorites = new Favorites({ albums, artists, tracks });

    return favorites;
  }

  private addId(id: string, typeEntity: TYPE_ENTITY) {
    try {
      this[SERVICE[typeEntity]].findOne(id);
      this.store.addId(id, typeEntity);
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
      throw error;
    }
  }

  addTrack(id: string) {
    this.addId(id, TYPE_ENTITY.TRACKS);
  }

  addAlbum(id: string) {
    this.addId(id, TYPE_ENTITY.ALBUMS);
  }

  addArtist(id: string) {
    this.addId(id, TYPE_ENTITY.ARTISTS);
  }

  private removeId(id: string, typeEntity: TYPE_ENTITY) {
    this.store.deleteId(id, typeEntity);
  }

  removeTrack(id: string) {
    this.removeId(id, TYPE_ENTITY.TRACKS);
  }

  removeAlbum(id: string) {
    this.removeId(id, TYPE_ENTITY.ALBUMS);
  }

  removeArtist(id: string) {
    this.removeId(id, TYPE_ENTITY.ARTISTS);
  }
}
