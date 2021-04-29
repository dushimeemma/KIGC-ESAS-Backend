import { Router } from 'express';

import Count from '../../controllers/count_records';
import Auth from '../../middleware/auth';
import asyncHandler from '../../middleware/errors/asyncHandler';

const auth = new Auth();
const count = new Count();
const router = Router();

router
  .get('/students', auth.checkToken, asyncHandler(count.countStudents))
  .get('/rooms', auth.checkToken, asyncHandler(count.countRooms))
  .get('/courses', auth.checkToken, asyncHandler(count.countCourses))
  .get(
    '/assigned-rooms',
    auth.checkToken,
    asyncHandler(count.countAssignedCourses)
  );

export default router;
