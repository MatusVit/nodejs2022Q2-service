import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggingModule } from 'src/logging/logging.module';

@Module({
  imports: [LoggingModule], // ! ***
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
