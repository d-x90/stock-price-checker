import { PriceUpdate, PrismaClient } from '@prisma/client';
import {
  calculateMovingAverage,
  calculateStockMetrics
} from '../../services/priceUpdate';

const mockPrisma = {
  priceUpdate: {
    findMany: jest.fn()
  }
};

describe('priceUpdate service tests', () => {
  describe('calculateMovingAverage', () => {
    it('should return correct moving average value', () => {
      const stockPrices = [4, 4, 4, 4, 8, 8, 8, 8];

      const movingAverage = calculateMovingAverage(stockPrices);

      expect(movingAverage).toBe(6);
    });

    it('should return 0 for empty array', () => {
      const stockPrices: number[] = [];

      const movingAverage = calculateMovingAverage(stockPrices);

      expect(movingAverage).toBe(0);
    });
  });

  describe('calculateStockMetrics', () => {
    it('should return correct stock metrics', async () => {
      const stockId = 1;
      const mockPriceUpdates = [
        { id: 1, price: 8, updateTime: '2024-06-23T20:59:41.653Z', stockId },
        { id: 2, price: 8, updateTime: '2024-06-23T20:58:41.653Z', stockId },
        { id: 3, price: 8, updateTime: '2024-06-23T20:57:41.653Z', stockId },
        { id: 4, price: 8, updateTime: '2024-06-23T20:56:41.653Z', stockId },
        { id: 5, price: 8, updateTime: '2024-06-23T20:55:41.653Z', stockId },
        { id: 6, price: 4, updateTime: '2024-06-23T20:54:41.653Z', stockId },
        { id: 7, price: 4, updateTime: '2024-06-23T20:53:41.653Z', stockId },
        { id: 8, price: 4, updateTime: '2024-06-23T20:52:41.653Z', stockId },
        { id: 9, price: 4, updateTime: '2024-06-23T20:51:41.653Z', stockId },
        { id: 10, price: 4, updateTime: '2024-06-23T20:50:41.653Z', stockId }
      ];
      mockPrisma.priceUpdate.findMany.mockResolvedValue(mockPriceUpdates);

      const stockMetrics = await calculateStockMetrics(
        mockPrisma as unknown as PrismaClient,
        stockId
      );

      expect(stockMetrics).toEqual({
        currentPrice: mockPriceUpdates[0].price,
        movingAverage: 6,
        lastUpdateTime: mockPriceUpdates[0].updateTime
      });
    });

    it('should return specific metrics if there are no price updates for the stock', async () => {
      const stockId = 1;
      const mockPriceUpdates: PriceUpdate[] = [];
      mockPrisma.priceUpdate.findMany.mockResolvedValue(mockPriceUpdates);

      const stockMetrics = await calculateStockMetrics(
        mockPrisma as unknown as PrismaClient,
        stockId
      );

      expect(stockMetrics).toEqual({
        currentPrice: 0,
        movingAverage: 0,
        lastUpdateTime: null
      });
    });
  });
});
