const chai = require('chai'),
          chaiHttp = require('chai-http'),
          server = require('../server'),
          should = chai.should(),
          mongoose = require('mongoose'),
          assert = require( 'assert');

var {User} = require('../db/models/userModel')

chai.use(chaiHttp);

describe('signup up new user', ()=>{
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
      username: 'test',
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
      username: 'test',
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
});

describe('new user must be unique', ()=>{
  beforeEach((done) => {
    joe = new User({
      username: 'test',
      email: 'test@test.com',
      password: 'password'
    });
    joe.save()
      .then(() =>{done();});
  });

  it('email must be unique', (done)=>{
    let user = new User({
      username: 'test1',
      email: 'test@test.com',
      password: 'password'
    });

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
    let user = new User({
      username: 'test',
      email: 'test1@test.com',
      password: 'password'
    });

    chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          done();
        });
  });
});
