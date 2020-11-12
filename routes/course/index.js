import { Router } from 'express';
import Course from '../../controllers/course';
import asyncHandler from '../../middleware/errors/asyncHandler';
import Auth from '../../middleware/auth';
import CheckCourse from '../../middleware/auth/checkDept';

const attendance = new Course();
const router = Router();
const auth = new Auth();
const checkDept = new CheckCourse();

router
  .post(
    '/record/:id',
    auth.checkToken,
    checkDept.checkDept,
    asyncHandler(attendance.record)
  )
  .get(
    '/',
    auth.checkToken,
    checkDept.checkDept,
    asyncHandler(attendance.getAll)
  );

export default router;
