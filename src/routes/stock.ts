import { Router } from 'express';
import { addStock, getStockMetrics } from '../controllers/stock';

const stockRoutes = Router();

/**
 * @swagger
 * /stock/{symbol}:
 *   get:
 *     summary: Get stock metrics for a given symbol
 *     tags: [Stock]
 *     parameters:
 *       - in: path
 *         name: symbol
 *         schema:
 *             type: string
 *         required: true
 *         description: Symbol of the stock
 *     responses:
 *      200:
 *          description: Returns the stock metrics
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          currentPrice:
 *                              type: number
 *                          movingAverage:
 *                              type: number
 *                          lastUpdateTime:
 *                              type: timestamp
 *      404:
 *          description: Stock not found
 */
stockRoutes.get('/:symbol', getStockMetrics);

/**
 * @swagger
 * /stock/{symbol}:
 *   put:
 *     summary: Add stock to the price watchlist
 *     tags: [Stock]
 *     parameters:
 *       - in: path
 *         name: symbol
 *         schema:
 *             type: string
 *         required: true
 *         description: Symbol of the stock
 *     responses:
 *       200:
 *          description: Returns the newly created stock
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: number
 *                          symbol:
 *                              type: string
 *                          createdAt:
 *                              type: timestamp
 *       400:
 *          description: Symbol is invalid
 *       409:
 *          description: Stock already exists
 */
stockRoutes.put('/:symbol', addStock);

export default stockRoutes;
