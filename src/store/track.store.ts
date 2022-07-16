import { Track } from './../track/entities/track.entity';
import { STORE_CODE } from './../constants/commons';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';

@Injectable()
export class InMemoryTrackStore {
  private readonly entities: Track[] = [];

  create(createDto: CreateTrackDto): Track {
    const newTrack = new Track({
      id: uuidv4(),
      ...createDto,
    });
    this.entities.push(newTrack);
    return newTrack;
  }

  getAll(): Track[] {
    return this.entities;
  }

  get(id: string): Track {
    const entity = this.entities.find(({ id: entityId }) => entityId === id);
    return entity || null;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track | STORE_CODE {
    const index = this.entities.findIndex(
      ({ id: entityId }) => entityId === id,
    );
    const updateEntity = this.entities[index];

    if (index < 0) return null;

    this.entities[index] = { ...updateEntity, ...updateTrackDto };
    return this.entities[index];
  }

  delete(id: string): Track {
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

  deleteAlbumId(id: string): void {
    this.entities.forEach((entity) => {
      if (entity.albumId === id) {
        entity.albumId = null;
      }
    });
  }
}
