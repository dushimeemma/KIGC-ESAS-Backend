import { User, Role } from '../models';

class profile {
  async getProfile(req, res) {
    const users = await User.findAll({ include: { model: Role } });
    res.status(200).json({
      status: 'ok',
      msg: 'Profile retrieved success',
      users,
    });
  }
}

export default profile;
