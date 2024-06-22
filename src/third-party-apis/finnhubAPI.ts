import axios from 'axios';
import { FINNHUB_API_KEY, FINNHUB_API_URL } from '../config';

const finnhubApi = axios.create({
  baseURL: FINNHUB_API_URL,
  timeout: 3000,
  headers: { 'X-Finnhub-Token': FINNHUB_API_KEY }
});

export interface StockPriceResponse {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
}

export const fetchStockPrice = async (symbol: string) => {
  const { data } = await finnhubApi.get<StockPriceResponse>(
    `/quote?symbol=${symbol}`
  );

  const currentPrice = data.c;

  return currentPrice;
};

export interface SymbolSearchResult {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

export interface SymbolSearchResponse {
  count: number;
  result: SymbolSearchResult[];
}

export const checkSymbolValidity = async (symbol: string) => {
  const { data } = await finnhubApi.get<SymbolSearchResponse>(
    `/search?q=${symbol}`
  );

  const isSymbolValid = data.result.some((item) => item.symbol === symbol);

  return isSymbolValid;
};
