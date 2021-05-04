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
  .put('/:id', auth.checkToken, dept.checkDept, asyncHandler(room.update))
  .get('/', auth.checkToken, asyncHandler(room.getAll))
  .get(
    '/clean/rooms',
    auth.checkToken,
    admin.getAdmin,
    asyncHandler(room.clearRooms)
  )
  .get('/:id', auth.checkToken, asyncHandler(room.getOne))
  .delete('/:id', auth.checkToken, asyncHandler(room.delete));

export default router;
