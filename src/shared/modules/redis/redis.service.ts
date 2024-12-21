import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class RedisService {
  private redisClient: Redis;
  constructor() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST,
      db: parseInt(process.env.REDIS_DATABASE),
      port: parseInt(process.env.REDIS_PORT),
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
    });
  }

  async setValue(
    key: string,
    value: string,
    ttlSeconds: number = null,
  ): Promise<string | null> {
    await this.redisClient.set(key, value); // Redis'e değer kaydedin
    if (ttlSeconds) {
      await this.redisClient.expire(key, ttlSeconds);
    }
    return await this.redisClient.get(key);
  }

  async getValue(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async clear(key: string): Promise<any> {
    return await this.redisClient.del(key);
  }

  async getKeyTTL(key: string): Promise<number> {
    return await this.redisClient.ttl(key);
  }
}
