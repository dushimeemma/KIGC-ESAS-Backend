import { Router } from 'express';
import User from '../../controllers/auth';
import asyncHandler from '../../middleware/errors/asyncHandler';
import { signup, login } from '../../middleware/validations/signup';
import Auth from '../../middleware/auth';

const router = Router();
const user = new User();
const auth = new Auth();

router
  .post('/signup', signup, asyncHandler(user.createUser))
  .post('/login', login, asyncHandler(user.loginUser))
  .get('/logout', auth.checkToken, asyncHandler(user.logout));

export default router;
