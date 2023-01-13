import { Router } from 'express';
import Seat from '../../controllers/seat';
import asyncHandler from '../../middleware/errors/asyncHandler';
import Auth from '../../middleware/auth';
import CheckDept from '../../middleware/auth/checkDept';
import { seatValidation } from '../../middleware/validations/seat';

const router = Router();
const seat = new Seat();
const auth = new Auth();
const check = new CheckDept();

router
  .post(
    '/assign/:id',
    auth.checkToken,
    check.checkDept,
    seatValidation,
    asyncHandler(seat.assign)
  )
  .post('/view', asyncHandler(seat.view));

export default router;
