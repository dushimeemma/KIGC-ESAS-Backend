import { Router } from 'express';
import auth from './auth';
import role from './roles';
import user from './user';
import student from './student';
import finance from './finance';
import attendance from './attendance';
import course from './course';
import seat from './seat';
import room from './room';

const router = Router();

router.use('/auth', auth);
router.use('/role', role);
router.use('/user', user);
router.use('/student', student);
router.use('/finance', finance);
router.use('/attendance', attendance);
router.use('/course', course);
router.use('/seat', seat);
router.use('/room', room);

export default router;
