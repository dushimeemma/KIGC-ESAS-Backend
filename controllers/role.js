import { Role, User } from '../models';

class role {
  async create(req, res) {
    const role = req.body;

    const getRole = await Role.findOne({ where: { name: role.name } });

    if (getRole)
      return res.status(200).json({
        status: 'ok',
        msg: `${getRole.name} role already exist`,
      });

    const newRole = await Role.create(role);

    res.status(200).json({
      status: 'ok',
      msg: 'Role created success',
      role: newRole,
    });
  }
  async getAll(req, res) {
    const roles = await Role.findAll();
    res.status(200).json({
      status: 'ok',
      msg: 'Roles retrieved success',
      roles,
    });
  }
  async getOne(req, res) {
    const role = await Role.findOne({ where: { id: req.params.id } });

    if (!role)
      return res.status(404).json({
        status: 'ok',
        msg: 'No roles found',
      });

    res.status(200).json({
      status: 'ok',
      msg: 'Role retrieved success',
      role,
    });
  }
  async update(req, res) {
    const role = await Role.findOne({ where: { id: req.params.id } });
    const getRole = req.body;

    if (!role)
      return res.status(404).json({
        status: 'ok',
        msg: 'No role found',
      });

    const updtRole = await Role.update(getRole, {
      where: { id: req.params.id },
      returning: true,
    });

    res.status(200).json({
      status: 'ok',
      msg: 'Role updated success',
      role: updtRole,
    });
  }
  async delete(req, res) {
    const role = await Role.findOne({ where: { id: req.params.id } });

    if (!role)
      return res.status(404).json({
        status: 'ok',
        msg: 'No role found',
      });

    await role.destroy();

    res.status(200).json({
      status: 'ok',
      msg: 'Role deleted success',
    });
  }
  async assign(req, res) {
    const getRole = req.body;
    const checkRole = await Role.findOne({ where: { name: getRole.role } });
    const checkUser = await User.findOne({ where: { email: getRole.email } });

    if (!checkRole)
      return res.status(400).json({
        status: 'failed',
        msg: 'Role not found',
      });

    if (!checkUser)
      return res.status(400).json({
        status: 'failed',
        msg: 'User not found',
      });

    const newRole = { role: checkRole.id };

    await User.update(newRole, {
      where: { email: checkUser.email },
      returning: true,
    });

    res.status(200).json({
      status: 'ok',
      msg: 'Role assigned success',
    });
  }
}
export default role;
