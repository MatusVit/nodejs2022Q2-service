import { InMemoryArtistStore } from './../store/artists.store';
import { Module, forwardRef } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';
import { FavsModule } from 'src/favs/favs.module';

@Module({
  // imports: [AlbumModule, TrackModule, FavsModule],
  imports: [
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    forwardRef(() => FavsModule),
  ],
  controllers: [ArtistController],
  providers: [ArtistService, InMemoryArtistStore],
  exports: [ArtistService],
})
export class ArtistModule {}
