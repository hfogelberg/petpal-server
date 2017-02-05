let mongoose = require('mongoose');

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});
