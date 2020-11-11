import { Router } from 'express';
import Role from '../../controllers/role';
import asyncHandler from '../../middleware/errors/asyncHandler';
import { validateRole } from '../../middleware/validations/role';
import Auth from '../../middleware/auth';

const router = Router();
const role = new Role();
const auth = new Auth();

router
  .post('/create', auth.checkToken, validateRole, asyncHandler(role.create))
  .get('/read', auth.checkToken, asyncHandler(role.getAll))
  .get('/read/:id', auth.checkToken, asyncHandler(role.getOne))
  .put('/update/:id', auth.checkToken, asyncHandler(role.update))
  .delete('/delete/:id', auth.checkToken, asyncHandler(role.delete));

export default router;
