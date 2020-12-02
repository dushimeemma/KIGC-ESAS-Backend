import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { Student, Course, Finance, Attendance } from '../../models';

chai.use(chaiHttp);
chai.should();
let token1;
let token2;
let token3;
let id;
let student;
let dummyId = 100;
let course;
let finance;
let attendance;
let student1;
let student2;
let finance1;
let attendance1;

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
    course = await Course.create({
      name: 'TESTJS',
    });
    finance = await Finance.create({
      amount: '60000',
      status: 'paid',
    });
    attendance = await Attendance.create({
      percentage: '100',
      status: 'attended',
    });
    student = await Student.create({
      regNo: 'TEST/889',
      name: 'TEST STD',
      department: 'TESTDP',
      level: '3',
      course: course.id,
      finance: finance.id,
      attendance: attendance.id,
    });
    finance1 = await Finance.create({
      amount: '40000',
      status: 'unpaid',
    });
    attendance1 = await Attendance.create({
      percentage: '50',
      status: 'unattended',
    });
    student1 = await Student.create({
      regNo: 'TEST/001',
      name: 'TEST STD',
      department: 'TESTDP',
      level: '3',
      course: course.id,
      finance: finance1.id,
      attendance: attendance.id,
    });
    student2 = await Student.create({
      regNo: 'TEST/002',
      name: 'TEST STD',
      department: 'TESTDP',
      level: '3',
      course: course.id,
      finance: finance.id,
      attendance: attendance1.id,
    });
    id = student.id;
  });
  it('Should assign seat to student', (done) => {
    chai
      .request(app)
      .post(`/api/seat/assign/${id}`)
      .set({ 'x-auth-token': token2 })
      .send({ room: 'TEST', seat: '001' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should not assign seat when student not found', (done) => {
    chai
      .request(app)
      .post(`/api/seat/assign/${dummyId}`)
      .set({ 'x-auth-token': token2 })
      .send({ room: 'TEST', seat: '001' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        done();
      });
  });
  it('Should not assign seat when seat already assigned to another student', (done) => {
    chai
      .request(app)
      .post(`/api/seat/assign/${id}`)
      .set({ 'x-auth-token': token2 })
      .send({ room: 'TEST', seat: '001' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should not assign seat when room or seat not provided', (done) => {
    chai
      .request(app)
      .post(`/api/seat/assign/${id}`)
      .set({ 'x-auth-token': token2 })
      .send({ seat: '002' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should view seats', (done) => {
    chai
      .request(app)
      .post('/api/seat/view')
      .send({ reg: 'TEST/889' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should not view seats when not registered', (done) => {
    chai
      .request(app)
      .post('/api/seat/view')
      .send({ reg: 'TEST/100' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        done();
      });
  });
  it('Should not view seats when not paid', (done) => {
    chai
      .request(app)
      .post('/api/seat/view')
      .send({ reg: 'TEST/001' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should not view seats when not attended', (done) => {
    chai
      .request(app)
      .post('/api/seat/view')
      .send({ reg: 'TEST/002' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
});
