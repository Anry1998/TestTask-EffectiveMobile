import {Router } from "express"
import { getByShopId, getByPlu, getByAction } from '../controller/gets.controller';

const router = Router();
router.use('/get-by-shop-id', getByShopId);
router.use('/get-by-plu', getByPlu);
router.use('/get-by-action', getByAction);

export default router;

