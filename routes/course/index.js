import { Router } from 'express';
import Course from '../../controllers/course';
import asyncHandler from '../../middleware/errors/asyncHandler';
import Auth from '../../middleware/auth';
import CheckCourse from '../../middleware/auth/checkDept';
import { validateCourse } from '../../middleware/validations/course';

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
  .post(
    '/create',
    auth.checkToken,
    checkDept.checkDept,
    validateCourse,
    asyncHandler(attendance.create)
  )
  .get('/', auth.checkToken, asyncHandler(attendance.getAll))
  .get('/:id', auth.checkToken, asyncHandler(attendance.getOne));

export default router;
