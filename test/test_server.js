const assert = require( 'assert'),
          chai = require('chai'),
          chaiHttp = require('chai-http'),
          server = require('../server'),
          should = chai.should();

chai.use(chaiHttp);

describe('server', ()=>{
  it('it should respond with 200', (done)=>{
    chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
  });
});
