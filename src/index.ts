import express, { Request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createLogger } from './logging';
import stockRoutes from './routes/stock';
import { prisma } from './prisma';
import { startStockPriceCheckerJob } from './cron-jobs/jobs';
import { connectToRedis } from './redis';
import { PORT } from './config';

const logger = createLogger('index');

const startApp = async () => {
  try {
    const redisClient = await connectToRedis();

    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    app.use((req: Request, _, next) => {
      req.prisma = prisma;
      req.redis = redisClient;
      next();
    });

    app.use('/healthz', (_, res) => res.status(204).send());

    app.use('/stock', stockRoutes);

    app.use((_, res) => res.status(404).send());

    app.listen(PORT, () => {
      logger.info(`[server]: 🚀  Server is running on port :${PORT}`);
    });

    startStockPriceCheckerJob(prisma, redisClient);
  } catch (error) {
    logger.error('Application error', error);
  } finally {
    await prisma.$disconnect();
  }
};

startApp();
