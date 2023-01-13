import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';
import { User } from '../../src/models';
import { encode } from '../../src/utils/jwt';

chai.use(chaiHttp);
chai.should();
let user;
let token;
let dummyToken;
let dummyUser;

describe('Auth', () => {
  before(async () => {
    dummyUser = {
      name: 'Dummy With Mocha',
      email: 'dummy@dummy.com',
      password: 'Password2019',
    };
    dummyToken = encode(dummyUser);
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
  it('Should not create user when email is not provided', (done) => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send({
        name: user.name,
        password: user.password,
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should login user', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({
        email: user.email,
        password: user.password,
      })
      .end((err, res) => {
        if (err) done(err);
        token = res.body.token;
        res.should.have.status(200);
        done();
      });
  });
  it('Should not login user when email is not exists', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({
        email: 'invalid@invalid.com',
        password: user.password,
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should not login user when password is wrong', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({
        email: user.email,
        password: 'DammyPasswrd2020',
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should not login user when password is not provided', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({
        email: user.email,
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should logout user', (done) => {
    chai
      .request(app)
      .get('/api/auth/logout')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should not logout user without login', (done) => {
    chai
      .request(app)
      .get('/api/auth/logout')
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should not logout user when token no longer valid', (done) => {
    chai
      .request(app)
      .get('/api/auth/logout')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should not logout unexisted user', (done) => {
    chai
      .request(app)
      .get('/api/auth/logout')
      .set({ 'x-auth-token': dummyToken })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        done();
      });
  });
  it('Should not logout user when token is invalid', (done) => {
    chai
      .request(app)
      .get('/api/auth/logout')
      .set({ 'x-auth-token': 'dummyToken' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
});
