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

  async create(createDto: CreateTrackDto): Promise<Track> {
    const track = await this.prisma.track.create({
      data: createDto,
    });
    return plainToInstance(Track, track);
  }

  async findAll(): Promise<Track[]> {
    const tracks = await this.prisma.track.findMany();
    return tracks.map((track) => plainToInstance(Track, track));
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) throw new NotFoundException(MESSAGE.TRACK_NOT_EXIST);

    return plainToInstance(Track, track);
  }

  async update(id: string, updateDto: UpdateTrackDto): Promise<Track> {
    await this.checkExistById(id);

    const track = await this.prisma.track.update({
      where: { id },
      data: updateDto,
    });
    return plainToInstance(Track, track);
  }

  async remove(id: string): Promise<void> {
    await this.checkExistById(id);
    await this.prisma.track.delete({ where: { id } });
  }

  private async checkExistById(id: string): Promise<void> {
    const count = await this.prisma.track.count({
      where: { id },
    });
    if (!count) throw new NotFoundException(MESSAGE.TRACK_NOT_EXIST);
  }
}
