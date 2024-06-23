import dotenv from 'dotenv';
dotenv.config();

export const HOST_NAME = process.env.HOST_NAME || 'localhost';
export const PORT = Number(process.env.PORT) || 3000;
export const DATABASE_URL = process.env.DATABASE_URL || '';
export const REDIS_URL = process.env.REDIS_URL || '';
export const FINNHUB_API_URL = process.env.FINNHUB_API_URL || '';
export const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY || '';
