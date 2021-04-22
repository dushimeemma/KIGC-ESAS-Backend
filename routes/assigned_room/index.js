import { Router } from 'express';

import AssignedRoom from '../../controllers/assigned_room';
import Auth from '../../middleware/auth/index';
import Dept from '../../middleware/auth/checkDept';
import asyncHandler from '../../middleware/errors/asyncHandler';
import { validateAssignedRoom } from '../../middleware/validations/assigned_room';

const router = Router();
const assigned = new AssignedRoom();
const auth = new Auth();
const dept = new Dept();

router.post(
  '/assign',
  auth.checkToken,
  dept.checkDept,
  validateAssignedRoom,
  asyncHandler(assigned.assign)
);

export default router;
