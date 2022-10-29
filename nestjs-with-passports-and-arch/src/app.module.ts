import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    RedisModule.forRoot({
      config: {
        url: process.env.REDIS_URI as string,
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
