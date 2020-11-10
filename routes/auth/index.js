import { Router } from 'express';
import User from '../../controllers/auth';
import asyncHandler from '../../middleware/errors/asyncHandler';
import { signup } from '../../middleware/validations/signup';

const router = Router();
const user = new User();

router.post('/signup', signup, asyncHandler(user.createUser));

export default router;
