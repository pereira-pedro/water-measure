import { z } from "zod";

const schema = z.object({
  CACHE_REDIS_HOST: z.string().default("redis"),
  CACHE_REDIS_PORT: z.coerce.number().default(6379),
  CACHE_REDIS_PASSWORD: z.string().optional(),
  CACHE_REDIS_DB: z.coerce.number().optional(),
  CACHE_REDIS_KEY_PREFIX: z.string().optional(),
});

export type RedisCacheConfig = z.infer<typeof schema>;

export function loadRedisCacheConfig(env: NodeJS.ProcessEnv): RedisCacheConfig {
  return schema.parse(env);
}
