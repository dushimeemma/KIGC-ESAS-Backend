import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('App', () => {
  it('Should start the application', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
});
