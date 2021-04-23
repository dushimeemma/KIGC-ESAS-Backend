import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../index';

chai.use(chaiHttp);
chai.should();

let token;

describe('Should assign a room', () => {
  before(async () => {
    const response = await chai.request(app).post('/api/auth/login').send({
      email: 'attendance@email.com',
      password: 'Password2019',
    });
    token = response.body.token;
  });
  it('Should assign a room', (done) => {
    chai
      .request(app)
      .post('/api/assigned_room/assign')
      .set({ 'x-auth-token': token })
      .send({ course_id: 1, room_id: 1 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it("Should not assign when a room doesn' exists", (done) => {
    chai
      .request(app)
      .post('/api/assigned_room/assign')
      .set({ 'x-auth-token': token })
      .send({ course_id: 1, room_id: 100 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.should.be.a('Object');
        done();
      });
  });
  it("Should not assign when a course doesn' exists", (done) => {
    chai
      .request(app)
      .post('/api/assigned_room/assign')
      .set({ 'x-auth-token': token })
      .send({ course_id: 100, room_id: 1 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.should.be.a('Object');
        done();
      });
  });
});
