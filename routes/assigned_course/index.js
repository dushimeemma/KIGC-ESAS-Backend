import { Router } from 'express';

import AssignedCourse from '../../controllers/assigned_course';
import asyncHandler from '../../middleware/errors/asyncHandler';
import { validateAssignedCourse } from '../../middleware/validations/assigned_course';
import Auth from '../../middleware/auth/index';
import Hod from '../../middleware/auth/checkHod';

const assigned_course = new AssignedCourse();
const auth = new Auth();
const hod = new Hod();
const router = Router();

router
  .post(
    '/assign',
    auth.checkToken,
    hod.getHod,
    validateAssignedCourse,
    asyncHandler(assigned_course.assign)
  )
  .get('/', auth.checkToken, asyncHandler(assigned_course.getAll));

export default router;
