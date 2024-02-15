// // src/cache/cache.service.ts

// import { Injectable } from '@nestjs/common';
// import { RedisService } from 'nestjs-redis';

// @Injectable()
// export class CacheService {
//   constructor(private readonly redisService: RedisService) {}

//   async get(key: string): Promise<any> {
//     const client = await this.redisService.getClient();
//     const data = await client.get(key);
//     return data ? JSON.parse(data) : null;
//   }

//   async set(key: string, value: any, expireSeconds?: number): Promise<void> {
//     const client = await this.redisService.getClient();
//     await client.set(key, JSON.stringify(value));
//     if (expireSeconds) {
//       await client.expire(key, expireSeconds);
//     }
//   }

//   async del(key: string): Promise<void> {
//     const client = await this.redisService.getClient();
//     await client.del(key);
//   }
// }
