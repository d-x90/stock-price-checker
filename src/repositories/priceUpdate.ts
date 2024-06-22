import { PrismaClient } from '@prisma/client';

export const getLastTenPriceUpdatesByStockId = async (
  prisma: PrismaClient,
  stockId: number
) =>
  prisma.priceUpdate.findMany({
    where: { stockId },
    orderBy: { updateTime: 'desc' },
    take: 10
  });

export const createPriceUpdate = async (
  prisma: PrismaClient,
  priceUpdateCreationSchema: {
    stockId: number;
    price: number;
  }
) =>
  prisma.priceUpdate.create({
    data: { ...priceUpdateCreationSchema }
  });
