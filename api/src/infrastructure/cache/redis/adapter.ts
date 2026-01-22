import { CacheKey } from "../../../domain/cache/models/cache-key";
import { CacheGateway, CacheWriteOptions } from "../../../domain/cache/ports/cache-gateway";
import { RedisCacheClient } from "./client";

export class RedisCacheAdapter implements CacheGateway {
  constructor(private readonly client: RedisCacheClient, private readonly keyPrefix?: string) {}

  async get<T = string>(key: CacheKey): Promise<T | null> {
    const raw = await this.client.get(this.prefixKey(key));
    return raw as T | null;
  }

  async set<T>(key: CacheKey, value: T, options?: CacheWriteOptions): Promise<void> {
    const cacheKey = this.prefixKey(key);
    const raw = this.serialize(value);
    if (options?.ttlSeconds && options.ttlSeconds > 0) {
      await this.client.set(cacheKey, raw, "EX", options.ttlSeconds);
      return;
    }

    await this.client.set(cacheKey, raw);
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

  private serialize(value: unknown): string {
    if (value === undefined) {
      throw new Error("Cannot cache undefined value");
    }
    if (typeof value === "string") {
      return value;
    }

    return JSON.stringify(value);
  }
}
