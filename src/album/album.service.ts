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

  async create(createDto: CreateAlbumDto) {
    const album = await this.prisma.album.create({
      data: createDto,
    });
    return plainToInstance(Album, album);
  }

  async findAll() {
    const albums = await this.prisma.album.findMany();
    return albums.map((album) => plainToInstance(Album, album));
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) throw new NotFoundException(MESSAGE.ALBUM_NOT_EXIST);

    return plainToInstance(Album, album);
  }

  async update(id: string, updateDto: UpdateAlbumDto) {
    const album = await this.prisma.album.update({
      where: { id },
      data: updateDto,
    });

    if (!album) throw new NotFoundException(MESSAGE.ALBUM_NOT_EXIST);

    return plainToInstance(Album, album);
  }

  async remove(id: string) {
    const album = await this.prisma.album.delete({ where: { id } });

    if (!album) throw new NotFoundException(MESSAGE.ALBUM_NOT_EXIST);

    return;
  }
}
