import { Request, Response } from 'express';
import { createStock, getStockBySymbol } from '../repositories/stock';
import { checkSymbolValidity } from '../third-party-apis/finnhubAPI';
import { getStockMetrics } from '../services/priceUpdate';

export const getStock = async (req: Request, res: Response) => {
  const {
    prisma,
    redis,
    params: { symbol }
  } = req;

  const stock = await getStockBySymbol(prisma, symbol);

  if (!stock) {
    res.status(404);
    throw new Error('Stock not found!');
  }

  const cachedStockMetrics = JSON.parse((await redis.get(symbol)) || 'null');

  if (cachedStockMetrics) {
    return res.status(200).json(cachedStockMetrics);
  }

  const stockMetrics = await getStockMetrics(prisma, stock.id);

  await redis.set(symbol, JSON.stringify(stockMetrics));

  return res.status(200).json(stockMetrics);
};

export const addStock = async (req: Request, res: Response) => {
  const {
    prisma,
    params: { symbol }
  } = req;

  try {
    const existingStockInDB = await getStockBySymbol(prisma, symbol);

    if (existingStockInDB) {
      res.status(409);
      throw new Error('Stock already exists!');
    }

    const isSymbolValid = await checkSymbolValidity(symbol);

    if (!isSymbolValid) {
      res.status(400);
      throw new Error(`Symbol "${symbol}" is not valid`);
    }

    const stock = await createStock(prisma, symbol);

    return res.status(200).json({ stock });
  } catch (error) {
    res.json({
      errorMessage: (error as Error)?.message ?? error
    });
  }
};
