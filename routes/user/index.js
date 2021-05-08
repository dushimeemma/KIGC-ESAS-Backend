import { Router } from 'express';
import User from '../../controllers/user';
import asyncHandler from '../../middleware/errors/asyncHandler';
import Auth from '../../middleware/auth';

const router = Router();
const user = new User();
const auth = new Auth();

router.get('/profile', auth.checkToken, asyncHandler(user.getProfile));
router.get('/profile/:id', auth.checkToken, asyncHandler(user.getOneUser));

export default router;
