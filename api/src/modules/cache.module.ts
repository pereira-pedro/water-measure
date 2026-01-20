import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { CacheService } from "../application/cache/cache.service";
import { CACHE_GATEWAY } from "../domain/cache/ports/cache-gateway";
import { RedisCacheAdapter } from "../infrastructure/cache/redis/adapter";
import { createRedisCacheClient, type RedisCacheClient } from "../infrastructure/cache/redis/client";
import { loadRedisCacheConfig, type RedisCacheConfig } from "../infrastructure/cache/redis/config";
import { REDIS_CACHE_CLIENT, REDIS_CACHE_CONFIG } from "../infrastructure/cache/redis/tokens";

@Module({
  imports: [ConfigModule],
  providers: [
    CacheService,
    {
      provide: REDIS_CACHE_CONFIG,
      inject: [ConfigService],
      useFactory: (cfg: ConfigService): RedisCacheConfig => {
        return loadRedisCacheConfig({
          CACHE_REDIS_HOST: cfg.get<string>("CACHE_REDIS_HOST") ?? cfg.get<string>("REDIS_HOST"),
          CACHE_REDIS_PORT: cfg.get<string>("CACHE_REDIS_PORT") ?? cfg.get<string>("REDIS_PORT"),
          CACHE_REDIS_PASSWORD: cfg.get<string>("CACHE_REDIS_PASSWORD"),
          CACHE_REDIS_DB: cfg.get<string>("CACHE_REDIS_DB"),
          CACHE_REDIS_KEY_PREFIX: cfg.get<string>("CACHE_REDIS_KEY_PREFIX"),
        } as NodeJS.ProcessEnv);
      },
    },
    {
      provide: REDIS_CACHE_CLIENT,
      inject: [REDIS_CACHE_CONFIG],
      useFactory: (config: RedisCacheConfig): RedisCacheClient => {
        return createRedisCacheClient({
          host: config.CACHE_REDIS_HOST,
          port: config.CACHE_REDIS_PORT,
          password: config.CACHE_REDIS_PASSWORD,
          db: config.CACHE_REDIS_DB,
        });
      },
    },
    {
      provide: CACHE_GATEWAY,
      inject: [REDIS_CACHE_CLIENT, REDIS_CACHE_CONFIG],
      useFactory: (client: RedisCacheClient, config: RedisCacheConfig) => {
        return new RedisCacheAdapter(client, config.CACHE_REDIS_KEY_PREFIX);
      },
    },
  ],
  exports: [CacheService, CACHE_GATEWAY],
})
export class CacheModule {}
