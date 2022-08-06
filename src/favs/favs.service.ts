import { Favorites } from './entities/fav.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TYPE_ENTITY } from 'src/constants/commons';
import { PrismaService } from 'src/prisma/prisma.service';
import { MESSAGE_NOT_EXIST } from 'src/constants/massages';
import { plainToInstance } from 'class-transformer';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/track/entities/track.entity';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const albums = await this.prisma.album.findMany({
      where: { isFavorite: true },
    });
    const albumEntities = albums.map((album) => plainToInstance(Album, album));

    const artists = await this.prisma.artist.findMany({
      where: { isFavorite: true },
    });
    const artistEntities = artists.map((artist) =>
      plainToInstance(Artist, artist),
    );

    const tracks = await this.prisma.track.findMany({
      where: { isFavorite: true },
    });
    const trackEntities = tracks.map((track) => plainToInstance(Track, track));

    const favorites = new Favorites({
      albums: albumEntities,
      artists: artistEntities,
      tracks: trackEntities,
    });

    return favorites;
  }

  async addAlbum(id: string) {
    await this.updateAlbum(id, true);
  }

  async addArtist(id: string): Promise<void> {
    await this.updateArtist(id, true);
  }

  async addTrack(id: string): Promise<void> {
    await this.updateTrack(id, true);
  }

  async removeAlbum(id: string) {
    await this.updateAlbum(id, false);
  }

  async removeArtist(id: string) {
    await this.updateArtist(id, false);
  }

  async removeTrack(id: string): Promise<void> {
    await this.updateTrack(id, false);
  }

  private async updateAlbum(id: string, isFavorite: boolean): Promise<void> {
    await this.checkExistById(id, TYPE_ENTITY.ALBUMS);
    await this.prisma.album.update({ where: { id }, data: { isFavorite } });
  }

  private async updateArtist(id: string, isFavorite: boolean): Promise<void> {
    await this.checkExistById(id, TYPE_ENTITY.ARTISTS);
    await this.prisma.artist.update({ where: { id }, data: { isFavorite } });
  }

  private async updateTrack(id: string, isFavorite: boolean): Promise<void> {
    await this.checkExistById(id, TYPE_ENTITY.TRACKS);
    await this.prisma.track.update({ where: { id }, data: { isFavorite } });
  }

  private async checkExistById(
    id: string,
    typeEntity: TYPE_ENTITY,
  ): Promise<void> {
    let count = 0;
    switch (typeEntity) {
      case TYPE_ENTITY.ALBUMS:
        count = await this.prisma.album.count({
          where: { id },
        });
        break;

      case TYPE_ENTITY.ARTISTS:
        count = await this.prisma.artist.count({
          where: { id },
        });
        break;

      case TYPE_ENTITY.TRACKS:
        count = await this.prisma.track.count({
          where: { id },
        });
        break;
    }

    if (!count)
      throw new HttpException(
        MESSAGE_NOT_EXIST[typeEntity],
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
  }
}
