import { Role } from '../../models';
class Department {
  async checkDept(req, res, next) {
    if (req.user.role === null) {
      return res.status(400).json({
        status: 'failed',
        msg: 'You have no Role on ESAS',
      });
    }

    const role = await Role.findOne({ where: { id: req.user.role } });

    if (role.name !== 'DEPT') {
      return res.status(400).json({
        status: 'failed',
        msg: 'You are not DEPARTMENT OFFICER on ESAS',
      });
    }
    next();
  }
}
export default Department;
