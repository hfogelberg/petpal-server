// const mongoose = require('mongoose');
// let config = require('config');
//
// before((done) => {
//   mongoose.Promise = global. Promise;
//   mongoose.connect(config.DBHost);
//   mongoose.connection
//         .once('open', () => {
//           console.log('Connected to ' + process.env.NODE_ENV+ ' DB');
//           done();
//         })
//         .on('error', (err) => {
//           console.warn('Warning', err);
//         });
// });
//
// beforeEach((done) => {
//   mongoose.connection.collections.users.drop(() => {
//     done();
//   });
// });
