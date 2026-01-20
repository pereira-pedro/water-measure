import Redis from "ioredis";

export type RedisCacheClient = Redis;

export function createRedisCacheClient(params: {
  host: string;
  port: number;
  password?: string;
  db?: number;
}): RedisCacheClient {
  return new Redis({
    host: params.host,
    port: params.port,
    password: params.password,
    db: params.db,
    maxRetriesPerRequest: 2,
  });
}
