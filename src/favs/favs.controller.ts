import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { Favorites } from './entities/fav.entity';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async getAll() {
    return await this.favsService.getAll();
  }

  @HttpCode(201)
  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.favsService.addTrack(id);
  }

  @HttpCode(204)
  @Delete('track/:id')
  async removeTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favsService.removeTrack(id);
  }

  @HttpCode(201)
  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.favsService.addAlbum(id);
  }

  @HttpCode(204)
  @Delete('album/:id')
  async removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favsService.removeAlbum(id);
  }

  @HttpCode(201)
  @Post('artist/:id')
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favsService.addArtist(id);
  }

  @HttpCode(204)
  @Delete('artist/:id')
  async removeArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favsService.removeArtist(id);
  }
}
