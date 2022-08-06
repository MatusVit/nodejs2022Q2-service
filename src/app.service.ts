import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<p> Hello. Use <a href="/doc">/doc</a> for API help </p>`;
  }
}
