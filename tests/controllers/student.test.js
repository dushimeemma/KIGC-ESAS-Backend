import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
chai.should();

let token;
let token2;
let token3;
let id;
let dummyId = 100000;

describe('Student', () => {
  before(async () => {
    const response = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'test2@test.com', password: 'Password2019' });
    const response2 = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'Password2019' });
    const response3 = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'not@email.com', password: 'Password2019' });
    token3 = response3.body.token;
    token = response.body.token;
    token2 = response2.body.token;
  });
  it('Should create student', (done) => {
    chai
      .request(app)
      .post('/api/student/create')
      .send({
        regNo: 'TEST/123',
        name: 'TEST STD',
        department: 'TESTDP',
        level: '3',
      })
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        id = res.body.student.id;
        res.should.have.status(200);
        done();
      });
  });

  it('Should not create student when reg number exists', (done) => {
    chai
      .request(app)
      .post('/api/student/create')
      .send({
        regNo: 'TEST/123',
        name: 'TEST STD',
        department: 'TESTDP',
        level: '3',
      })
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should not create student when user has no role', (done) => {
    chai
      .request(app)
      .post('/api/student/create')
      .send({
        regNo: 'TEST/124',
        name: 'TEST STD',
        department: 'TESTDP',
        level: '3',
      })
      .set({ 'x-auth-token': token2 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should not create student when user role is not HOD', (done) => {
    chai
      .request(app)
      .post('/api/student/create')
      .send({
        regNo: 'TEST/125',
        name: 'TEST STD',
        department: 'TESTDP',
        level: '3',
      })
      .set({ 'x-auth-token': token3 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should not create student when name is not provided', (done) => {
    chai
      .request(app)
      .post('/api/student/create')
      .send({
        regNo: 'TEST/125',
        department: 'TESTDP',
        level: '3',
      })
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should get all students', (done) => {
    chai
      .request(app)
      .get('/api/student')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should get one student', (done) => {
    chai
      .request(app)
      .get(`/api/student/${id}`)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should not get one student when id not found', (done) => {
    chai
      .request(app)
      .get(`/api/student/${dummyId}`)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        done();
      });
  });
  it('Should get all students per class and department', (done) => {
    chai
      .request(app)
      .post('/api/student/single-class')
      .send({ department: 'TESTDP', level: '3' })
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should update student', (done) => {
    chai
      .request(app)
      .put(`/api/student/${id}`)
      .send({ department: 'TESTDP', level: '5' })
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should not update student when not found', (done) => {
    chai
      .request(app)
      .put(`/api/student/${dummyId}`)
      .send({ department: 'TESTDP', level: '5' })
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        done();
      });
  });
  it('Should delete student', (done) => {
    chai
      .request(app)
      .delete(`/api/student/${id}`)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should not delete student when not found', (done) => {
    chai
      .request(app)
      .delete(`/api/student/${id}`)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        done();
      });
  });
  it('Should create student', (done) => {
    chai
      .request(app)
      .post('/api/student/create')
      .send({
        regNo: 'D/BCS/17/09/6177',
        name: 'TEST STD',
        department: 'TESTDP',
        level: '3',
      })
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        id = res.body.student.id;
        res.should.have.status(200);
        done();
      });
  });
});
