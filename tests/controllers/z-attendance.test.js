import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';
import { Student } from '../../src/models';

chai.use(chaiHttp);
chai.should();
let token1;
let token2;
let token3;
let id;
let student;
let dummyId = 100;

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
      regNo: 'TEST/678',
      name: 'TEST STD',
      department: 'TESTDP',
      level: '3',
    });
    id = student.id;
  });
  it('Should record attandance status of a student', (done) => {
    chai
      .request(app)
      .post(`/api/attendance/record/${id}`)
      .send({ percentage: '90' })
      .set({ 'x-auth-token': token2 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should record attendance status of a student', (done) => {
    chai
      .request(app)
      .post(`/api/attendance/record/${id}`)
      .send({ percentage: '70' })
      .set({ 'x-auth-token': token2 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should not record attendance status when student not found', (done) => {
    chai
      .request(app)
      .post(`/api/attendance/record/${dummyId}`)
      .send({ percentage: '70' })
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
      .post(`/api/attendance/record/${dummyId}`)
      .send({ percentage: '70' })
      .set({ 'x-auth-token': token1 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should not record attendance status when user role not department officer', (done) => {
    chai
      .request(app)
      .post(`/api/attendance/record/${dummyId}`)
      .send({ percentage: '60' })
      .set({ 'x-auth-token': token3 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
});
