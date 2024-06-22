import { PrismaClient } from '@prisma/client';
import { RedisClient } from './redis';

declare global {
  namespace Express {
    interface Request {
      prisma: PrismaClient;
      redis: RedisClient;
    }
  }
}
