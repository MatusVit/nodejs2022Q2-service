import { InMemoryAlbumStore } from './../store/album.store';
import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, InMemoryAlbumStore],
  exports: [InMemoryAlbumStore],
})
export class AlbumModule {}
