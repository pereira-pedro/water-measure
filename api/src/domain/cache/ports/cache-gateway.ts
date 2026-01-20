import { CacheKey } from "../models/cache-key";

export type CacheWriteOptions = {
  ttlSeconds?: number;
};

export interface CacheGateway {
  get(key: CacheKey): Promise<string | null>;
  set(key: CacheKey, value: string, options?: CacheWriteOptions): Promise<void>;
  delete(key: CacheKey): Promise<void>;
  exists(key: CacheKey): Promise<boolean>;
}

export const CACHE_GATEWAY = Symbol("CACHE_GATEWAY");
