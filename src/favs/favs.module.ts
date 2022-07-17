import { forwardRef, Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { InMemoryFavoritesStore } from 'src/store/favorites.store';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  imports: [
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
  ],
  controllers: [FavsController],
  providers: [FavsService, InMemoryFavoritesStore],
  exports: [FavsService],
})
export class FavsModule {}
