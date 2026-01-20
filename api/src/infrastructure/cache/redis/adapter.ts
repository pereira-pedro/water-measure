import { CacheKey } from "../../../domain/cache/models/cache-key";
import { CacheGateway, CacheWriteOptions } from "../../../domain/cache/ports/cache-gateway";
import { RedisCacheClient } from "./client";

export class RedisCacheAdapter implements CacheGateway {
  constructor(private readonly client: RedisCacheClient, private readonly keyPrefix?: string) {}

  async get(key: CacheKey): Promise<string | null> {
    return this.client.get(this.prefixKey(key));
  }

  async set(key: CacheKey, value: string, options?: CacheWriteOptions): Promise<void> {
    const cacheKey = this.prefixKey(key);
    if (options?.ttlSeconds && options.ttlSeconds > 0) {
      await this.client.set(cacheKey, value, "EX", options.ttlSeconds);
      return;
    }

    await this.client.set(cacheKey, value);
  }

  async delete(key: CacheKey): Promise<void> {
    await this.client.del(this.prefixKey(key));
  }

  async exists(key: CacheKey): Promise<boolean> {
    return (await this.client.exists(this.prefixKey(key))) > 0;
  }

  private prefixKey(key: CacheKey): string {
    if (!this.keyPrefix) {
      return key.value;
    }

    const normalized = this.keyPrefix.endsWith(":") ? this.keyPrefix : `${this.keyPrefix}:`;
    return `${normalized}${key.value}`;
  }
}
