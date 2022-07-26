import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
@Module({
  imports: [PrismaModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
