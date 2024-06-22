import { PrismaClient } from '@prisma/client';
import { getAllStock } from '../repositories/stock';
import pThrottle from 'p-throttle';
import { fetchStockPrice } from '../third-party-apis/finnhubAPI';
import { createPriceUpdate } from '../repositories/priceUpdate';
import { createLogger } from '../logging';
import { RedisClient } from '../redis';

const logger = createLogger('fetchStockPrices');

export const checkStockPrices = async (
  prisma: PrismaClient,
  redis: RedisClient
) => {
  const stocks = await getAllStock(prisma);

  const throttle = pThrottle({
    limit: 15,
    interval: 1000
  });

  stocks.forEach(
    throttle(async (stock) => {
      try {
        const price = await fetchStockPrice(stock.symbol);

        await redis.del(stock.symbol);

        await createPriceUpdate(prisma, { stockId: stock.id, price });
      } catch (error) {
        logger.error(
          `Error during fetching stock price for "${stock.symbol}"`,
          error
        );
      }
    })
  );
};
