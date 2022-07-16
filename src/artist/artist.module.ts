import { InMemoryArtistStore } from './../store/artists.store';
import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';

@Module({
  imports: [AlbumModule, TrackModule],
  controllers: [ArtistController],
  providers: [ArtistService, InMemoryArtistStore],
})
export class ArtistModule {}
