import { Router } from 'express';
import Role from '../../controllers/role';
import asyncHandler from '../../middleware/errors/asyncHandler';
import { validateRole } from '../../middleware/validations/role';
import Auth from '../../middleware/auth';
import UserRole from '../../middleware/auth/checkAdmin';

const router = Router();
const role = new Role();
const auth = new Auth();
const checkRole = new UserRole();

router
  .post('/create', auth.checkToken, validateRole, asyncHandler(role.create))
  .get('/read', auth.checkToken, asyncHandler(role.getAll))
  .get('/read/:id', auth.checkToken, asyncHandler(role.getOne))
  .put('/update/:id', auth.checkToken, asyncHandler(role.update))
  .delete('/delete/:id', auth.checkToken, asyncHandler(role.delete))
  .post(
    '/assign',
    auth.checkToken,
    checkRole.getAdmin,
    asyncHandler(role.assign)
  );

export default router;
