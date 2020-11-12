import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
chai.should();
let token;
let res;

describe('Profile', () => {
  before(async () => {
    res = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'test2@test.com', password: 'Password2019' });
    token = res.body.token;
  });
  it('Should get all users', (done) => {
    chai
      .request(app)
      .get('/api/user/profile')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
});
