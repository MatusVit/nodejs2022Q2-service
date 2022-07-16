import { TrackService } from './../track/track.service';
import { MESSAGE } from './../constants/massages';
import { InMemoryAlbumStore } from './../store/album.store';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(
    private readonly store: InMemoryAlbumStore,
    private readonly trackService: TrackService,
  ) {}

  create(createDto: CreateAlbumDto) {
    return this.store.create(createDto);
  }

  findAll() {
    return this.store.getAll();
  }

  findOne(id: string) {
    const entity = this.store.get(id);
    if (!entity) throw new NotFoundException(MESSAGE.ALBUM_NOT_EXIST);
    return entity;
  }

  update(id: string, updateDto: UpdateAlbumDto) {
    const entity = this.store.update(id, updateDto);

    if (!entity) throw new NotFoundException(MESSAGE.ALBUM_NOT_EXIST);

    return entity;
  }

  remove(id: string) {
    const entity = this.store.delete(id);
    if (!entity) throw new NotFoundException(MESSAGE.ALBUM_NOT_EXIST);
    this.trackService.removeAlbumId(id);
    return;
  }

  removeArtistId(id: string) {
    this.store.deleteArtistId(id);
  }
}
