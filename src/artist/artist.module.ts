import { InMemoryArtistStore } from './../store/artists.store';
import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, InMemoryArtistStore],
})
export class ArtistModule {}
