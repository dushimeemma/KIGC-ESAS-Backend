import { Router } from 'express';
import Student from '../../controllers/student';
import Auth from '../../middleware/auth';
import HoD from '../../middleware/auth/checkHod';
import Admin from '../../middleware/auth/checkAdmin';
import {
  validateStudent,
  validateFilterStudent,
} from '../../middleware/validations/student';
import asyncHandler from '../../middleware/errors/asyncHandler';

const student = new Student();
const router = Router();
const auth = new Auth();
const hod = new HoD();
const admin = new Admin();

router
  .post(
    '/create',
    auth.checkToken,
    hod.getHod,
    validateStudent,
    asyncHandler(student.create)
  )
  .get('/', auth.checkToken, asyncHandler(student.getAll))
  .get('/:id', auth.checkToken, asyncHandler(student.getOne))
  .get(
    '/clean/students',
    auth.checkToken,
    admin.getAdmin,
    asyncHandler(student.clearStudents)
  )
  .get(
    '/search/students',
    auth.checkToken,
    asyncHandler(student.searchStudentsByNameOrRegNo)
  )
  .post(
    '/single-class',
    auth.checkToken,
    validateFilterStudent,
    asyncHandler(student.getStudentByClass)
  )
  .put('/:id', auth.checkToken, asyncHandler(student.update))
  .delete('/:id', auth.checkToken, asyncHandler(student.delete));

export default router;
