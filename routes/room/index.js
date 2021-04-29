import { Router } from 'express';

import Room from '../../controllers/room';
import asyncHandler from '../../middleware/errors/asyncHandler';
import Auth from '../../middleware/auth/index';
import Dept from '../../middleware/auth/checkDept';
import Admin from '../../middleware/auth/checkAdmin';
import { validateRoom } from '../../middleware/validations/room';

const room = new Room();
const dept = new Dept();
const auth = new Auth();
const admin = new Admin();
const router = Router();

router
  .post(
    '/create',
    auth.checkToken,
    dept.checkDept,
    validateRoom,
    asyncHandler(room.create)
  )
  .get('/', auth.checkToken, asyncHandler(room.getAll))
  .get(
    '/clean/rooms',
    auth.checkToken,
    admin.getAdmin,
    asyncHandler(room.clearRooms)
  );

export default router;
