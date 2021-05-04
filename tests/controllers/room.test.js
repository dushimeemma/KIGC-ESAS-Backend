import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../index';

chai.use(chaiHttp);
chai.should();

let token;

describe('Room', () => {
  before(async () => {
    const response = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'attendance@email.com', password: 'Password2019' });
    token = response.body.token;
  });
  it('Should create room', (done) => {
    chai
      .request(app)
      .post('/api/room/create')
      .send({ name: 'Test Name', capacity: 10 })
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should create room', (done) => {
    chai
      .request(app)
      .post('/api/room/create')
      .send({ name: 'Test Name 2', capacity: 10 })
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should get all rooms', (done) => {
    chai
      .request(app)
      .get('/api/room/')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should get one room', (done) => {
    chai
      .request(app)
      .get('/api/room/1')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should update room where id', (done) => {
    chai
      .request(app)
      .put('/api/room/1')
      .set({ 'x-auth-token': token })
      .send({ name: 'ROOM UPDATE' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should delete room', (done) => {
    chai
      .request(app)
      .delete('/api/room/2')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
});
