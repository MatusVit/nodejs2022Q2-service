import { MESSAGE } from './../constants/massages';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateAlbumDto): Promise<Album> {
    const album = await this.prisma.album.create({
      data: createDto,
    });
    return plainToInstance(Album, album);
  }

  async findAll(): Promise<Album[]> {
    const albums = await this.prisma.album.findMany();
    return albums.map((album) => plainToInstance(Album, album));
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) throw new NotFoundException(MESSAGE.ALBUM_NOT_EXIST);

    return plainToInstance(Album, album);
  }

  async update(id: string, updateDto: UpdateAlbumDto): Promise<Album> {
    await this.checkExistById(id);
    const album = await this.prisma.album.update({
      where: { id },
      data: updateDto,
    });

    return plainToInstance(Album, album);
  }

  async remove(id: string): Promise<void> {
    await this.checkExistById(id);
    await this.prisma.album.delete({ where: { id } });
  }

  private async checkExistById(id: string): Promise<void> {
    const count = await this.prisma.album.count({
      where: { id },
    });
    if (!count) throw new NotFoundException(MESSAGE.ALBUM_NOT_EXIST);
  }
}
