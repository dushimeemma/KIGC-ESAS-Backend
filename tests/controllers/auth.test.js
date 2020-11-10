import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { User } from '../../models';

chai.use(chaiHttp);
chai.should();
let user;

describe('Auth', () => {
  before(async () => {
    user = {
      name: 'Test With Mocha',
      email: 'test@test.com',
      password: 'Password2019',
    };
    await User.destroy({ where: { email: user.email } });
  });
  it('Should register user', (done) => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should not create user when email already exits', (done) => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
});
