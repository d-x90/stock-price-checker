import { PrismaClient } from '@prisma/client';
import { getLastTenPriceUpdatesByStockId } from '../repositories/priceUpdate';

export const calculateMovingAverage = (prices: number[]) => {
  if (prices.length === 0) {
    return 0;
  }

  const movingAverage =
    prices.reduce((sum, currentPrice) => sum + currentPrice, 0) / prices.length;

  return movingAverage;
};

export const getStockMetrics = async (
  prisma: PrismaClient,
  stockId: number
) => {
  const lastTenPriceUpdateOfStock = await getLastTenPriceUpdatesByStockId(
    prisma,
    stockId
  );

  if (lastTenPriceUpdateOfStock.length === 0) {
    return {
      currentPrice: 0,
      movingAverage: 0,
      lastUpdateTime: null
    };
  }

  const movingAverage = calculateMovingAverage(
    lastTenPriceUpdateOfStock.map((priceUpdate) => priceUpdate.price)
  );

  const lastPriceUpdate = lastTenPriceUpdateOfStock[0];

  return {
    currentPrice: lastPriceUpdate.price,
    movingAverage,
    lastUpdateTime: lastPriceUpdate.updateTime
  };
};
