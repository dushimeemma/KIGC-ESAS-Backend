import { Router } from 'express';
import Finance from '../../controllers/finance';
import asyncHandler from '../../middleware/errors/asyncHandler';
import Auth from '../../middleware/auth';
import CheckFinance from '../../middleware/auth/checkFinance';

const finance = new Finance();
const router = Router();
const auth = new Auth();
const checkFnc = new CheckFinance();

router.post(
  '/record/:id',
  auth.checkToken,
  checkFnc.checkFinance,
  asyncHandler(finance.record)
);

export default router;
