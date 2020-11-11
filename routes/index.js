import { Router } from 'express';
import auth from './auth';
import role from './roles';

const router = Router();

router.use('/auth', auth);
router.use('/role', role);

export default router;
