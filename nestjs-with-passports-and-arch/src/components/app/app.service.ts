import { Injectable } from '@nestjs/common';
import { publicRouteHandler, privateRouteHandler} from './use-cases/_index'

@Injectable()
export class AppService {
  publicRouteHandler = publicRouteHandler
  privateRouteHandler = privateRouteHandler
}
