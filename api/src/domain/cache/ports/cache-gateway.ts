import { CacheKey } from "../models/cache-key";

export type CacheWriteOptions = {
  ttlSeconds?: number;
};

export interface CacheGateway {
  get<T>(key: CacheKey): Promise<T | null>;
  set<T>(key: CacheKey, value: T, options?: CacheWriteOptions): Promise<void>;
  delete(key: CacheKey): Promise<void>;
  exists(key: CacheKey): Promise<boolean>;
}

export const CACHE_GATEWAY = Symbol("CACHE_GATEWAY");
