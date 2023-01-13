import { Router } from 'express';
import Attendance from '../../controllers/attendance';
import asyncHandler from '../../middleware/errors/asyncHandler';
import Auth from '../../middleware/auth';
import CheckAttendance from '../../middleware/auth/checkDept';

const attendance = new Attendance();
const router = Router();
const auth = new Auth();
const checkDept = new CheckAttendance();

router.post(
  '/record/:id',
  auth.checkToken,
  checkDept.checkDept,
  asyncHandler(attendance.record)
);

export default router;
