import { MESSAGE } from './../constants/massages';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateArtistDto): Promise<Artist> {
    const artist = await this.prisma.artist.create({
      data: createDto,
    });
    return plainToInstance(Artist, artist);
  }

  async findAll(): Promise<Artist[]> {
    const artists = await this.prisma.artist.findMany();
    return artists.map((artist) => plainToInstance(Artist, artist));
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) throw new NotFoundException(MESSAGE.ARTIST_NOT_EXIST);

    return plainToInstance(Artist, artist);
  }

  async update(id: string, updateDto: UpdateArtistDto): Promise<Artist> {
    await this.checkExistById(id);

    const artist = await this.prisma.artist.update({
      where: { id },
      data: updateDto,
    });

    return plainToInstance(Artist, artist);
  }

  async remove(id: string): Promise<void> {
    await this.checkExistById(id);
    await this.prisma.artist.delete({ where: { id } });
  }

  private async checkExistById(id: string): Promise<void> {
    const count = await this.prisma.artist.count({
      where: { id },
    });
    if (!count) throw new NotFoundException(MESSAGE.ARTIST_NOT_EXIST);
  }
}
