const chai = require('chai'),
          chaiHttp = require('chai-http'),
          server = require('../server'),
          should = chai.should(),
          mongoose = require('mongoose'),
          assert = require( 'assert'),
          User = require('../db/models/userModel')

describe('test users', ()=>{
  beforeEach((done)=>{
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it('it should create a new user', (done)=>{
    let user = {
      username: 'test',
      email: 'test@test.com',
      password: 'password'
    }
    chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          done();
        });
    done;
  });
});
