import { MESSAGE } from './../constants/massages';
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InMemoryTrackStore } from 'src/store/track.store';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class TrackService {
  constructor(
    private readonly store: InMemoryTrackStore,

    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

  create(createDto: CreateTrackDto) {
    return this.store.create(createDto);
  }

  findAll() {
    return this.store.getAll();
  }

  findOne(id: string) {
    const entity = this.store.get(id);
    if (!entity) throw new NotFoundException(MESSAGE.TRACK_NOT_EXIST);
    return entity;
  }

  update(id: string, updateDto: UpdateTrackDto) {
    const entity = this.store.update(id, updateDto);
    if (!entity) throw new NotFoundException(MESSAGE.TRACK_NOT_EXIST);
    return entity;
  }

  remove(id: string) {
    const entity = this.store.delete(id);
    if (!entity) throw new NotFoundException(MESSAGE.TRACK_NOT_EXIST);
    this.favsService.removeTrack(id);
    return;
  }

  removeArtistId(id: string) {
    this.store.deleteArtistId(id);
  }

  removeAlbumId(id: string) {
    this.store.deleteAlbumId(id);
  }
}
