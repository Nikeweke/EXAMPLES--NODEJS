import { getEnvPath } from '@utils/get-env-path';
require('dotenv').config({ path: getEnvPath() });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
