import { Role } from '../../models';
class superAdmin {
  async getAdmin(req, res, next) {
    if (req.user.role === null) {
      return res.status(400).json({
        status: 'failed',
        msg: 'You have no Role on ESAS',
      });
    }

    const role = await Role.findOne({ where: { id: req.user.role } });

    if (role.name !== 'SUPER_ADMIN') {
      return res.status(400).json({
        status: 'failed',
        msg: 'You are not SUPER ADMIN on ESAS',
      });
    }
    next();
  }
}
export default superAdmin;
