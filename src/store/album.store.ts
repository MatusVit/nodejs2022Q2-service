import { UpdateAlbumDto } from './../album/dto/update-album.dto';
import { CreateAlbumDto } from './../album/dto/create-album.dto';
import { Album } from './../album/entities/album.entity';
import { UpdateArtistDto } from './../artist/dto/update-artist.dto';
import { Artist } from './../artist/entities/artist.entity';
import { CreateArtistDto } from './../artist/dto/create-artist.dto';
import { STORE_CODE } from './../constants/commons';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryAlbumStore {
  private readonly entities: Album[] = [];

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum = new Album({
      id: uuidv4(),
      ...createAlbumDto,
    });
    this.entities.push(newAlbum);
    return newAlbum;
  }

  getAll(): Album[] {
    return this.entities;
  }

  get(id: string): Album {
    const entity = this.entities.find(({ id: entityId }) => entityId === id);
    return entity || null;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album | STORE_CODE {
    const index = this.entities.findIndex(
      ({ id: entityId }) => entityId === id,
    );
    const updateEntity = this.entities[index];

    if (index < 0) return null;

    this.entities[index] = { ...updateEntity, ...updateAlbumDto };
    return this.entities[index];
  }

  delete(id: string): Album {
    const index = this.entities.findIndex(
      ({ id: entityId }) => entityId === id,
    );

    if (index < 0) return null;

    const deleteEntityArray = this.entities.splice(index, 1);
    return deleteEntityArray[0];
  }

  deleteArtistId(id: string): void {
    this.entities.forEach((entity) => {
      if (entity.artistId === id) {
        entity.artistId = null;
      }
    });
  }
}
