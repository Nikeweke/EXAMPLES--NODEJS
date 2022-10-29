import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  publicRouteHandler(): string {
    return 'Public response'
  }
  
  privateRouteHandler(): string {
    return 'Private response!';
  }
}
