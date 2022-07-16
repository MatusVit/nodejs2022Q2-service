import { MESSAGE } from './../constants/massages';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InMemoryArtistStore } from 'src/store/artists.store';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly store: InMemoryArtistStore,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  create(createDto: CreateArtistDto) {
    return this.store.create(createDto);
  }

  findAll() {
    return this.store.getAll();
  }

  findOne(id: string) {
    const entity = this.store.get(id);
    if (!entity) throw new NotFoundException(MESSAGE.ARTIST_NOT_EXIST);
    return entity;
  }

  update(id: string, updateDto: UpdateArtistDto) {
    const entity = this.store.update(id, updateDto);

    if (!entity) throw new NotFoundException(MESSAGE.USER_NOT_EXIST);

    return entity;
  }

  remove(id: string) {
    const entity = this.store.delete(id);
    if (!entity) throw new NotFoundException(MESSAGE.USER_NOT_EXIST);
    this.trackService.removeArtistId(id);
    this.albumService.removeArtistId(id);
    return;
  }
}
