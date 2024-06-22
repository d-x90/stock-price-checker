import { PrismaClient } from '@prisma/client';

export const getAllStock = async (prisma: PrismaClient) => {
  return prisma.stock.findMany();
};

export const getStockBySymbol = async (
  prisma: PrismaClient,
  symbol: string
) => {
  return prisma.stock.findFirst({ where: { symbol } });
};

export const createStock = async (prisma: PrismaClient, symbol: string) => {
  return prisma.stock.create({
    data: { symbol }
  });
};
