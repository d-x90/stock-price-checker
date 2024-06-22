import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';
import { checkStockPrices } from './fetchStockPrices';
import { RedisClient } from '../redis';

export const startStockPriceCheckerJob = (
  prisma: PrismaClient,
  redis: RedisClient
) => {
  cron.schedule('* * * * *', () => {
    checkStockPrices(prisma, redis);
  });
};
