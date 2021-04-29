import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../index';

chai.use(chaiHttp);
chai.should();

let token;

describe('Clean Models', () => {
  before(async () => {
    const response = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'dushimeemma@aol.com', password: 'Admin2020' });
    token = response.body.token;
  });
  it('Should clean rooms', (done) => {
    chai
      .request(app)
      .get('/api/room/clean/rooms')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should clean courses', (done) => {
    chai
      .request(app)
      .get('/api/course/clean/courses')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should clean assigned courses', (done) => {
    chai
      .request(app)
      .get('/api/assigned_course/clean/assigned-courses')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should clean students', (done) => {
    chai
      .request(app)
      .get('/api/student/clean/students')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
});
