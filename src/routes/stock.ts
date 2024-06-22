import { Router } from 'express';
import { addStock, getStock } from '../controllers/stock';

const stockRoutes = Router();

stockRoutes.get('/:symbol', getStock);

stockRoutes.put('/:symbol', addStock);

export default stockRoutes;
