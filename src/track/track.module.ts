import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { InMemoryTrackStore } from 'src/store/track.store';

@Module({
  controllers: [TrackController],
  providers: [TrackService, InMemoryTrackStore],
  exports: [TrackService],
})
export class TrackModule {}
