import { InMemoryUserStore } from './../store/users.store';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, InMemoryUserStore],
  // providers: [UserService, PrismaService],
})
export class UserModule {}
