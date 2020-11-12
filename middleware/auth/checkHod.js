import { Role } from '../../models';
class hod {
  async getHod(req, res, next) {
    if (req.user.role === null) {
      return res.status(400).json({
        status: 'failed',
        msg: 'You have no Role on ESAS',
      });
    }

    const role = await Role.findOne({ where: { id: req.user.role } });

    if (role.name !== 'HOD') {
      return res.status(400).json({
        status: 'failed',
        msg: 'You are not HOD on ESAS',
      });
    }
    next();
  }
}
export default hod;
