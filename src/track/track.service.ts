import { MESSAGE } from './../constants/massages';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Track } from './entities/track.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateTrackDto) {
    const track = await this.prisma.track.create({
      data: createDto,
    });
    return plainToInstance(Track, track);
  }

  async findAll() {
    const tracks = await this.prisma.track.findMany();
    return tracks.map((track) => plainToInstance(Track, track));
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) throw new NotFoundException(MESSAGE.TRACK_NOT_EXIST);

    return plainToInstance(Track, track);
  }

  async update(id: string, updateDto: UpdateTrackDto) {
    const track = await this.prisma.track.update({
      where: { id },
      data: updateDto,
    });

    if (!track) throw new NotFoundException(MESSAGE.TRACK_NOT_EXIST);

    return plainToInstance(Track, track);
  }

  async remove(id: string) {
    const track = await this.prisma.artist.delete({ where: { id } });

    if (!track) throw new NotFoundException(MESSAGE.TRACK_NOT_EXIST);

    return;
  }
}
