import { InMemoryAlbumStore } from './../store/album.store';
import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from 'src/track/track.module';
import { InMemoryTrackStore } from 'src/store/track.store';

@Module({
  imports: [TrackModule],
  controllers: [AlbumController],
  providers: [AlbumService, InMemoryAlbumStore],
  exports: [AlbumService],
})
export class AlbumModule {}
