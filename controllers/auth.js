import { User, Logout } from '../models';
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
  async loginUser(req, res) {
    const getUser = req.body;

    const user = await User.findOne({ where: { email: getUser.email } });

    if (!user)
      return res.status(400).json({
        status: 'failed',
        msg: 'Email or Password Incorrect',
      });

    const validPassword = bcrypt.compareSync(getUser.password, user.password);

    if (!validPassword)
      return res.status(400).json({
        status: 'failed',
        msg: 'Email or Password Incorrect',
      });

    const payload = {
      name: getUser.email,
      email: getUser.email,
      password: getUser.password,
    };

    const token = encode(payload);

    res.status(200).json({
      status: 'ok',
      msg: 'Login Success',
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  }
  async logout(req, res) {
    const { 'x-auth-token': token } = req.headers;

    const blackList = {
      token,
    };

    await Logout.create(blackList);

    res.status(200).json({
      status: 'ok',
      msg: 'Logout success',
    });
  }
}

export default authController;
