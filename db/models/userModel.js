const mongoose = require('mongoose'),
      validator = require('validator'),
      bcrypt = require('bcryptjs'),
      _ = require('lodash'),
      HASH_SECRET =  process.env.HASH_SECRET ||  'secret',
      jwt = require('jsonwebtoken');


      const UserSchema = new mongoose.Schema({
        username: {
          type: String,
          required: [true, 'Username is missing'],
          trim: true,
          minlength: 1,
          minlength: 3
        },
        email: {
          type: String,
          required: true,
          trim: true,
          minlength: 1,
          unique: true,
          validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
          }
        },
        password: {
          type: String,
          required: [true, 'password is missing'],
          trim: true,
          minlength: 1,
          minlength: 4
        },
        tokens: [{
          access: {
            type: String,
            required: true
          },
          token: {
            type: String,
            required: true
          }
        }]
      });

      UserSchema.statics.findByToken = function(token) {
        console.log('findByToken', token);
        var User = this;
        var decoded;
        try {
            decoded = jwt.verify(token, HASH_SECRET );
        } catch (e) {
          return Promise.reject();
        }

        console.log('_id', decoded._id);

        return User.findOne({
          '_id': decoded._id,
          'tokens.token': token
        })
      };

      UserSchema.methods.generateAuthToken = function () {
        var user = this;
        var access = 'auth';
        var token = jwt.sign({_id: user._id.toHexString(), access}, HASH_SECRET).toString();

        user.tokens.push({access, token});

        return user.save().then(() => {
          return token;
        });
      };

      UserSchema.statics.findByCredentials = function (username, password) {
        var User = this;

        return User.findOne({username})
            .then((user) => {
              if (!user) {
                console.log('No user');
                return Promise.reject();
              } else {
                console.log('user found', user);
              }


              return new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (err, res) => {
                  if (res) {
                    console.log('Password OK');
                    resolve(user);
                  } else {
                    console.log('Wrong password');
                    reject();
                  }
                });
              });
            })
            .catch((e) => {
              console.log('Error in findByCredentials', e);
            });
        };

      UserSchema.pre('save', function (next) {
          var user = this;

          if (user.isModified('password')) {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
              });
            });
          } else {
            next();
          }
        });

      UserSchema.methods.toJSON = function () {
        var user = this;
        var userObject = user.toObject();

        return _.pick(userObject, ['_id', 'email', 'username']);
      };

      var User = mongoose.model('User', UserSchema);

      module.exports = {User};
