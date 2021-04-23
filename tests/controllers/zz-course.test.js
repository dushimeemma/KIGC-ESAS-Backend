import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { Student } from '../../models';

chai.use(chaiHttp);
chai.should();
let token1;
let token2;
let token3;
let id;
let student;
let dummyId = 100;
let course_id;

describe('Attendance', () => {
  before(async () => {
    const response = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'attendance@email.com', password: 'Password2019' });
    const response2 = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'not@email.com', password: 'Password2019' });
    const response3 = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'Password2019' });
    token2 = response.body.token;
    token3 = response3.body.token;
    token1 = response2.body.token;
    student = await Student.create({
      regNo: 'TEST/779',
      name: 'TEST STD',
      department: 'TESTDP',
      level: '3',
    });
    id = student.id;
  });
  it('Should get all courses', (done) => {
    chai
      .request(app)
      .get('/api/course')
      .set({ 'x-auth-token': token2 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });

  it('Should not record and assign course', (done) => {
    chai
      .request(app)
      .post(`/api/course/record/${id}`)
      .send({ name: 'JS' })
      .set({ 'x-auth-token': token2 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(500);
        done();
      });
  });
  it('Should assign course', (done) => {
    chai
      .request(app)
      .post(`/api/course/record/${id}`)
      .send({ name: 'JS' })
      .set({ 'x-auth-token': token2 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should not record or assign course when student not found', (done) => {
    chai
      .request(app)
      .post(`/api/course/record/${dummyId}`)
      .send({ name: 'JS' })
      .set({ 'x-auth-token': token2 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        done();
      });
  });
  it('Should not record attendance status when user have no role', (done) => {
    chai
      .request(app)
      .post(`/api/course/record/${dummyId}`)
      .send({ name: 'JS' })
      .set({ 'x-auth-token': token1 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should not record course when user role not department officer', (done) => {
    chai
      .request(app)
      .post(`/api/course/record/${dummyId}`)
      .send({ name: 'JS' })
      .set({ 'x-auth-token': token3 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should create a course', (done) => {
    chai
      .request(app)
      .post(`/api/course/create`)
      .send({
        name: 'JavaSript',
        start_date: '2021-04-28',
        end_date: '2021-05-28',
        session: 'DAY',
      })
      .set({ 'x-auth-token': token2 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should get all courses', (done) => {
    chai
      .request(app)
      .get(`/api/course`)
      .set({ 'x-auth-token': token3 })
      .end((err, res) => {
        if (err) done(err);
        course_id = res.body.courses[1].id;
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should get one course', (done) => {
    chai
      .request(app)
      .get(`/api/course/${course_id}`)
      .set({ 'x-auth-token': token3 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should not get one course when not found', (done) => {
    chai
      .request(app)
      .get(`/api/course/100`)
      .set({ 'x-auth-token': token3 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.should.be.a('Object');
        done();
      });
  });
});
