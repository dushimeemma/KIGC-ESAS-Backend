import { decode } from '../../utils/jwt';
import { User, Logout } from '../../models';

class auth {
  async checkToken(req, res, next) {
    const { 'x-auth-token': token } = req.headers;
    if (!token)
      return res.status(400).json({
        status: 'failed',
        msg: 'No Token access denied',
      });

    const invalidToken = await Logout.findOne({ where: { token } });
    if (invalidToken)
      return res.status(400).json({
        status: 'failed',
        msg: 'Token no longer valid',
      });

    try {
      const getUser = decode(token);

      const user = await User.findOne({ where: { email: getUser.email } });

      if (!user)
        return res.status(404).json({
          status: 'failed',
          msg: 'User not found',
        });

      req.user = user;

      next();
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}

export default auth;
