const chai = require('chai'),
          chaiHttp = require('chai-http'),
          server = require('../server'),
          should = chai.should(),
          mongoose = require('mongoose'),
          assert = require( 'assert');
var {User} = require('../db/models/userModel')

describe('sign up user', ()=>{
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
    done;
  });

    it('it must have an email', (done)=>{
      let user = {
        usernam: 'test',
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
      done;
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
      done;
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
            done;
          });
      done();
    });

    it('username must be unique', (done)=>{
      let u = new User({
        usernam: 'test',
        email: 'test@testcom',
        password: 'password'
      });
      u.save();

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
            done;
          });
      done();
    });

    it('email must be unique', (done)=>{
      let u = new User({
        usernam: 'test',
        email: 'test@testcom',
        password: 'password'
      });
      u.save();

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
      done;
    });
});
