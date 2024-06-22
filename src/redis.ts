import {
  RedisClientType,
  RedisFunctions,
  RedisModules,
  RedisScripts,
  createClient
} from 'redis';
import { REDIS_URL } from './config';
import { createLogger } from './logging';

const logger = createLogger('redis');

export type RedisClient = RedisClientType<
  RedisModules,
  RedisFunctions,
  RedisScripts
>;

export const connectToRedis = async (): Promise<RedisClient> => {
  const client = await createClient({ url: REDIS_URL })
    .on('error', (err) => logger.error('Redis Client Error', err))
    .connect();

  return client;
};
