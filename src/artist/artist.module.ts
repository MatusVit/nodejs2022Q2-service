import { InMemoryAlbumStore } from './../store/album.store';
import { InMemoryArtistStore } from './../store/artists.store';
import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [AlbumModule],
  controllers: [ArtistController],
  providers: [ArtistService, InMemoryArtistStore, InMemoryAlbumStore],
})
export class ArtistModule {}
