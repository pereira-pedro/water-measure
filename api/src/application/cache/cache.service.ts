import { Inject, Injectable } from "@nestjs/common";
import { CacheCodec, JsonCacheCodec } from "./cache-codec";
import { CacheKey } from "../../domain/cache/models/cache-key";
import { CACHE_GATEWAY, CacheGateway, CacheWriteOptions } from "../../domain/cache/ports/cache-gateway";

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_GATEWAY) private readonly gateway: CacheGateway) {}

  async get<T>(key: CacheKey, codec: CacheCodec<T> = JsonCacheCodec as CacheCodec<T>): Promise<T | null> {
    const raw = await this.gateway.get(key);
    if (raw === null) {
      return null;
    }

    return codec.deserialize(raw);
  }

  async set<T>(
    key: CacheKey,
    value: T,
    options?: CacheWriteOptions,
    codec: CacheCodec<T> = JsonCacheCodec as CacheCodec<T>
  ): Promise<void> {
    const raw = codec.serialize(value);
    await this.gateway.set(key, raw, options);
  }

  async getOrSet<T>(
    key: CacheKey,
    loader: () => Promise<T>,
    options?: CacheWriteOptions,
    codec: CacheCodec<T> = JsonCacheCodec as CacheCodec<T>
  ): Promise<T> {
    const cached = await this.get(key, codec);
    if (cached !== null) {
      return cached;
    }

    const value = await loader();
    await this.set(key, value, options, codec);
    return value;
  }

  async delete(key: CacheKey): Promise<void> {
    await this.gateway.delete(key);
  }

  async exists(key: CacheKey): Promise<boolean> {
    return this.gateway.exists(key);
  }
}
