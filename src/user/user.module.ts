import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoggingModule } from 'src/logging/logging.module';

@Module({
  imports: [LoggingModule], // ! ***
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
