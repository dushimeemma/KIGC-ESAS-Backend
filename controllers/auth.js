import { User } from '../models';
import bcrypt from 'bcryptjs';
import { encode } from '../utils/jwt';

class authController {
  async createUser(req, res) {
    const getUser = req.body;

    const email = await User.findOne({ where: { email: getUser.email } });

    if (email) {
      return res.status(400).json({
        status: 'failed',
        msg: 'Email already exists',
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(getUser.password, salt);

    getUser.password = hash;

    const payload = getUser.email;

    const token = encode({ payload });

    await User.create(getUser);

    res.status(200).json({
      status: 'ok',
      msg: 'user created successfully',
      token,
    });
  }
}

export default authController;
