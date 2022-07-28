import { FavoriteIds } from './../favs/entities/fav.entity';
import { STORE_CODE, TYPE_ENTITY } from './../constants/commons';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryFavoritesStore {
  private readonly entities = {
    [TYPE_ENTITY.ARTISTS]: [],
    [TYPE_ENTITY.ALBUMS]: [],
    [TYPE_ENTITY.TRACKS]: [],
  };

  getAll(): FavoriteIds {
    return this.entities;
  }

  addId(id: string, typeEntity: TYPE_ENTITY) {
    const array = this.entities[typeEntity];

    if (array.includes(id)) return;
    array.push(id);
  }

  addArtistId(id: string) {
    this.addId(id, TYPE_ENTITY.ARTISTS);
  }

  addAlbumId(id: string) {
    this.addId(id, TYPE_ENTITY.ALBUMS);
  }

  addTrackId(id: string) {
    this.addId(id, TYPE_ENTITY.TRACKS);
  }

  deleteId(id: string, typeEntity: TYPE_ENTITY): STORE_CODE {
    const array = this.entities[typeEntity];

    if (!array.includes(id)) return STORE_CODE.NOT_EXIST;

    this.entities[typeEntity] = array.filter((entitityId) => entitityId !== id);
    return STORE_CODE.OK;
  }

  deleteArtistId(id: string) {
    this.deleteId(id, TYPE_ENTITY.ARTISTS);
  }

  deleteAlbumId(id: string) {
    this.deleteId(id, TYPE_ENTITY.ALBUMS);
  }

  deleteTrackId(id: string) {
    this.addId(id, TYPE_ENTITY.TRACKS);
  }
}
