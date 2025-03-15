import { CacheableMemory } from 'cacheable';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { createKeyv, Keyv } from '@keyv/redis';

import { ConfigModule, ConfigService } from '@libs/config';

@Module({
  imports: [
    NestCacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        stores: [
          new Keyv({
            store: new CacheableMemory({ ttl: configService.cache.ttl, lruSize: configService.cache.lru }),
          }).store,
          createKeyv(`${configService.cache.service}://${configService.cache.host}:${configService.cache.port}`).store,
        ],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class CacheModule {}
