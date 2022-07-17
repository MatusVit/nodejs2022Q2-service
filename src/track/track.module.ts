import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { InMemoryTrackStore } from 'src/store/track.store';
import { FavsModule } from 'src/favs/favs.module';

@Module({
  imports: [forwardRef(() => FavsModule)],
  controllers: [TrackController],
  providers: [TrackService, InMemoryTrackStore],
  exports: [TrackService],
})
export class TrackModule {}
