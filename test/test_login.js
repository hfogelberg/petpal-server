const chai = require('chai'),
          chaiHttp = require('chai-http'),
          server = require('../server'),
          should = chai.should(),
          mongoose = require('mongoose'),
          assert = require( 'assert');

var {User} = require('../db/models/userModel');

chai.use(chaiHttp);

describe('login', ()=>{
  beforeEach((done) => {
    user = new User({
      username: 'test',
      email: 'test@test.com',
      password: 'password'
    });
    user.save().then(() =>{done();});
  });

  it('it should log in a user', (done)=>{
    let u  = {
      username: 'test',
      password: 'password'
    }

    chai.request(server)
      .post('/api/users/login')
      .send(u)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        done();
      });
  });
});
