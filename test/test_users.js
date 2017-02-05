const chai = require('chai'),
          chaiHttp = require('chai-http'),
          server = require('../server'),
          should = chai.should(),
          mongoose = require('mongoose'),
          assert = require( 'assert');
var {User} = require('../db/models/userModel')


describe('user', ()=>{
  beforeEach((done)=>{
    mongoose.connection.collections.users.drop(() => {done();});
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
  });

  it('it must have username', (done)=>{
    let user = {
      email: 'test@test.com',
      password: 'password'
    }
    chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          done();
        });
  });

  it('it must have a password', (done)=>{
    let user = {
      usernam: 'test',
      email: 'test@test.com'
    }
    chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          done();
        });
  });

  it('it must have a valid email', (done)=>{
    let user = {
      usernam: 'test',
      email: 'test@testcom',
      password: 'password'
    }
    chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          done();
        });
  });

  it('username must be unique', (done)=>{
    let user1 = new User({
      usernam: 'test1',
      email: 'test1@testcom',
      password: 'password'
    });

    user1.save().then(()=>{done();});

    let user2 = new User({
      usernam: 'test1',
      email: 'test2@testcom',
      password: 'password'
    });

    chai.request(server)
        .post('/api/users')
        .send(user2)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          done();
        });
  });

    it('email must be unique', (done)=>{
      let user1 = new User({
        usernam: 'test1',
        email: 'test1@testcom',
        password: 'password'
      });

      user1.save().then(()=>{done();});

      let user2 = new User({
        usernam: 'test2',
        email: 'test1@testcom',
        password: 'password'
      });

      chai.request(server)
          .post('/api/users')
          .send(user2)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            done();
          });
    });
});
