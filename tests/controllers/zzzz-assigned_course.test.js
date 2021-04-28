import chai from 'chai';
import chaiHttp from 'chai-http';
import { response } from 'express';

import app from '../../index';

chai.use(chaiHttp);
chai.should();

let token;
let id;
let dummyId = 999;

describe('Assigned Room', () => {
  before(async () => {
    const response = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'test2@test.com', password: 'Password2019' });
    token = response.body.token;
  });
  it('Should assign a course', (done) => {
    chai
      .request(app)
      .post('/api/assigned_course/assign')
      .set({ 'x-auth-token': token })
      .send({ student_reg: 'D/BCS/17/09/6177', course_id: 1 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });

  it('Should not assign a course when reg number not found', (done) => {
    chai
      .request(app)
      .post('/api/assigned_course/assign')
      .set({ 'x-auth-token': token })
      .send({ student_reg: 'D/BCS/17/09/6178', course_id: 1 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.should.be.a('Object');
        done();
      });
  });

  it('Should not assign a course when course not found', (done) => {
    chai
      .request(app)
      .post('/api/assigned_course/assign')
      .set({ 'x-auth-token': token })
      .send({ student_reg: 'D/BCS/17/09/6177', course_id: 20 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.should.be.a('Object');
        done();
      });
  });

  it('Should get all assigned courses', (done) => {
    chai
      .request(app)
      .get('/api/assigned_course/')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        id = res.body.assigned_courses[0].id;
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });

  it('Should get one assigned course', (done) => {
    chai
      .request(app)
      .get(`/api/assigned_course/${id}`)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });

  it('Should  not get one assigned course when not found', (done) => {
    chai
      .request(app)
      .get(`/api/assigned_course/${dummyId}`)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.should.be.a('Object');
        done();
      });
  });
});
