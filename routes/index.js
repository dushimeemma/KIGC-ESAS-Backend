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
import assigned_course from './assigned_course';
import assigned_room from './assigned_room';

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
router.use('/assigned_course', assigned_course);
router.use('/assigned_room', assigned_room);

export default router;
