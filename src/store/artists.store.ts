import { UpdateArtistDto } from './../artist/dto/update-artist.dto';
import { Artist } from './../artist/entities/artist.entity';
import { CreateArtistDto } from './../artist/dto/create-artist.dto';
import { STORE_CODE } from './../constants/commons';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryArtistStore {
  private readonly entities: Artist[] = [];

  create({ name, grammy }: CreateArtistDto): Artist {
    const newArtist = new Artist({
      id: uuidv4(),
      name,
      grammy,
    });
    this.entities.push(newArtist);
    return newArtist;
  }

  getAll(): Artist[] {
    return this.entities;
  }

  get(id: string): Artist {
    const entity = this.entities.find(({ id: entityId }) => entityId === id);
    return entity || null;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist | STORE_CODE {
    const index = this.entities.findIndex(
      ({ id: entityId }) => entityId === id,
    );
    const updateUser = this.entities[index];

    if (index < 0) return null;

    this.entities[index] = { ...updateUser, ...updateArtistDto };
    return this.entities[index];
  }

  delete(id: string): Artist {
    const index = this.entities.findIndex(
      ({ id: entityId }) => entityId === id,
    );

    if (index < 0) return null;

    const deleteEntityArray = this.entities.splice(index, 1);
    return deleteEntityArray[0];
  }
}
