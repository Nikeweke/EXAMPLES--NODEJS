import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
// controllers
import { AppController } from '@components/app/app.controller';
// services
import { AppService } from '@components/app/app.service';
// modules
import { AuthModule } from '@components/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    RedisModule.forRoot({
      config: {
        url: process.env.REDIS_URI as string,
      },
      readyLog: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
