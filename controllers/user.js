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

  async getOneUser(req, res) {
    const user = await User.findOne({
      where: { id: req.params.id },
      include: { model: Role },
    });

    res.status(200).json({
      message: 'User retrieved successfully',
      user,
    });
  }
}

export default profile;
