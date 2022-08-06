import { Module } from '@nestjs/common';
import { AppLogger } from './logging.Service';

@Module({
  providers: [AppLogger],
  exports: [AppLogger],
})
export class LoggingModule {}
