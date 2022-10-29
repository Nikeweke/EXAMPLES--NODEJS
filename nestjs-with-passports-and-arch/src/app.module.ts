import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';

import { AppController } from './components/app/app.controller';
import { AppService } from './components/app/app.service';
import { AuthModule } from '@components/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    RedisModule.register({
      url: process.env.REDIS_URI as string,
      onClientReady: async (client): Promise<void> => {
        client.on('error', err => console.error(err));
        client.on('ready', () =>
          console.log('Redis is running on 6379 port'),
        );
        client.on('restart', () =>
          console.warn('attempt to restart the redis server'),
        );
      },
      // reconnectOnError: (): boolean => true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
