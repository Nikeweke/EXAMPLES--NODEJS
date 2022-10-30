import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { RealIP } from 'nestjs-real-ip';
import * as Redis from 'ioredis';
import { RedisService } from '@liaoliaots/nestjs-redis';

import { AppService } from './app.service';
import { rateLimit } from '@utils/rate-limit';
// decorators
import Private from './decorators/private.decorator';


@Controller()
export class AppController {
  private readonly redisClient: Redis.Redis;

  constructor(
    private readonly appService: AppService,
    private readonly redisService: RedisService,
  ) {
    this.redisClient = this.redisService.getClient();
  }
  
  @Get()
  async publicRoute(@RealIP() ip: string): Promise<string> {
    await rateLimit({
      redisClient: this.redisClient, 
      rateLimit: Number(process.env.RATE_LIMIT_BY_IP) || 100,
      key: ip,
    })

    return this.appService.publicRouteHandler();
  }

  @Private("/private")
  async privateRoute(@Req() req): Promise<string> {
    await rateLimit({
      redisClient: this.redisClient, 
      rateLimit: Number(process.env.RATE_LIMIT_BY_TOKEN) || 100,
      key: req.headers.authorization.split(' ')[1],
    })

    return this.appService.privateRouteHandler();
  }
}
