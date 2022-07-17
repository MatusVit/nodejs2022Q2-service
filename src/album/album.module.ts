import { FavsModule } from './../favs/favs.module';
import { InMemoryAlbumStore } from './../store/album.store';
import { Module, forwardRef } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from 'src/track/track.module';

@Module({
  imports: [forwardRef(() => TrackModule), forwardRef(() => FavsModule)],
  controllers: [AlbumController],
  providers: [AlbumService, InMemoryAlbumStore],
  exports: [AlbumService],
})
export class AlbumModule {}
