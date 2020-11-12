import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
chai.should();
let token;
let res1;
let token1;
let res;
let role;
let id;
let dummyId = 199;

describe('Role', () => {
  before(async () => {
    await chai.request(app).post('/api/auth/signup').send({
      name: 'Test Name',
      email: 'test2@test.com',
      password: 'Password2019',
    });
    await chai.request(app).post('/api/auth/signup').send({
      name: 'DUMMY',
      email: 'not@email.com',
      password: 'Password2019',
    });
    await chai.request(app).post('/api/auth/signup').send({
      name: 'FINANCE',
      email: 'finance@email.com',
      password: 'Password2019',
    });
    await chai.request(app).post('/api/auth/signup').send({
      name: 'DEPARTMENT',
      email: 'attendance@email.com',
      password: 'Password2019',
    });
    res = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'test2@test.com', password: 'Password2019' });
    token = res.body.token;
    res1 = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'dushimeemma@aol.com', password: 'Admin2020' });
    token1 = res1.body.token;
    role = {
      name: 'HOD',
      description: 'ROLE TEST',
    };
  });
  it('Should create a role', (done) => {
    chai
      .request(app)
      .post('/api/role/create')
      .set({ 'x-auth-token': token })
      .send(role)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should create a role', (done) => {
    chai
      .request(app)
      .post('/api/role/create')
      .set({ 'x-auth-token': token })
      .send({ name: 'NEWROLE', description: 'NEW ROLE' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should create a role', (done) => {
    chai
      .request(app)
      .post('/api/role/create')
      .set({ 'x-auth-token': token })
      .send({ name: 'FINANCE', description: 'NEW FINANCE ROLE' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should create a role', (done) => {
    chai
      .request(app)
      .post('/api/role/create')
      .set({ 'x-auth-token': token })
      .send({ name: 'DEPT', description: 'DEPARTMENT TEST ROLE' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should not assign role when your are not super admin', (done) => {
    chai
      .request(app)
      .post('/api/role/assign')
      .set({ 'x-auth-token': token })
      .send({
        role: 'HOD',
        email: 'test2@test.com',
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should assign role to user', (done) => {
    chai
      .request(app)
      .post('/api/role/assign')
      .set({ 'x-auth-token': token1 })
      .send({
        role: 'HOD',
        email: 'test2@test.com',
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should assign role to user', (done) => {
    chai
      .request(app)
      .post('/api/role/assign')
      .set({ 'x-auth-token': token1 })
      .send({
        role: 'DEPT',
        email: 'attendance@email.com',
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should assign role to user', (done) => {
    chai
      .request(app)
      .post('/api/role/assign')
      .set({ 'x-auth-token': token1 })
      .send({
        role: 'NEWROLE',
        email: 'not@email.com',
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should assign role to user', (done) => {
    chai
      .request(app)
      .post('/api/role/assign')
      .set({ 'x-auth-token': token1 })
      .send({
        role: 'FINANCE',
        email: 'finance@email.com',
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should not assign role when your are not super admin', (done) => {
    chai
      .request(app)
      .post('/api/role/assign')
      .set({ 'x-auth-token': token })
      .send({
        role: 'HOD',
        email: 'test2@test.com',
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should not assign role to when role not found', (done) => {
    chai
      .request(app)
      .post('/api/role/assign')
      .set({ 'x-auth-token': token1 })
      .send({
        role: 'TESTEXIST',
        email: 'test2@test.com',
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should not assign role to when user not found', (done) => {
    chai
      .request(app)
      .post('/api/role/assign')
      .set({ 'x-auth-token': token1 })
      .send({
        role: 'HOD',
        email: 'testinvad@test.com',
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });

  it('Should not create a role when name is not provided', (done) => {
    chai
      .request(app)
      .post('/api/role/create')
      .set({ 'x-auth-token': token })
      .send({ description: 'DUMMY ROLE' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });
  it('Should not create a role when existed', (done) => {
    chai
      .request(app)
      .post('/api/role/create')
      .set({ 'x-auth-token': token })
      .send(role)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should get all roles', (done) => {
    chai
      .request(app)
      .get('/api/role/read')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        id = res.body.roles[0].id;
        res.should.have.status(200);
        res.body.should.have.property('msg').eql('Roles retrieved success');
        done();
      });
  });
  it('Should get single role', (done) => {
    chai
      .request(app)
      .get(`/api/role/read/${id}`)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should not get single role when not exist', (done) => {
    chai
      .request(app)
      .get(`/api/role/read/${dummyId}`)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        done();
      });
  });
  it('Should update role', (done) => {
    chai
      .request(app)
      .put(`/api/role/update/${id}`)
      .set({ 'x-auth-token': token })
      .send({ name: 'DUMMY' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should not update role when not found', (done) => {
    chai
      .request(app)
      .put(`/api/role/update/${dummyId}`)
      .set({ 'x-auth-token': token })
      .send({ name: 'HOD' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        done();
      });
  });
  it('Should delete role', (done) => {
    chai
      .request(app)
      .delete(`/api/role/delete/${id}`)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Should not delete role when not found', (done) => {
    chai
      .request(app)
      .delete(`/api/role/delete/${id}`)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        done();
      });
  });
});
