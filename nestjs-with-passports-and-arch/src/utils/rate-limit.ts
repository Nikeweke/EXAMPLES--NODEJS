import { HttpException, HttpStatus } from '@nestjs/common';
import * as Redis from 'ioredis';

interface Params {
  redisClient: Redis.Redis,
  key: string,
  rateLimit: number
}

const KEY_REDIS_RATE_TEMPLATE = (token) => 'USER_RATE_LIMIT_' + token 

export async function rateLimit({ redisClient, key, rateLimit }: Params ) {
  // const token = req.headers.authorization.split(' ')[1]

  const unixTimestamp = Math.floor(new Date().getTime() / 1000);

  const redisKey = KEY_REDIS_RATE_TEMPLATE(key)
  const userRateLimitRaw = await redisClient.get(redisKey)
  if (!userRateLimitRaw) {
    await redisClient.set(
      redisKey,
      JSON.stringify({ limit: rateLimit, createdAt: unixTimestamp }),
      'EX',
      unixTimestamp+3600,
    );
  } 

  const userRateLimit = JSON.parse(userRateLimitRaw)
  if (!userRateLimit.limit) {
    const allowedRequestIn = userRateLimit.createdAt+3600  
    throw new HttpException({
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
      error: 'Too Many Requests',
      message: `Rate limit exceeded. You will be allowed to reques in ${allowedRequestIn} seconds`,
    }, 429);
  }

  userRateLimit.limit--
  await redisClient.set(
    redisKey,
    JSON.stringify(userRateLimit),
    'EX',
    userRateLimit.createdAt+3600,
  );
}