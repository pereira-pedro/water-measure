export type CacheCodec<T> = {
  serialize(value: T): string;
  deserialize(value: string): T;
};

export const JsonCacheCodec: CacheCodec<unknown> = {
  serialize(value) {
    return JSON.stringify(value);
  },
  deserialize(value) {
    return JSON.parse(value) as unknown;
  },
};
