let mongoose = require('mongoose');
let config = require('config');

let options = {
				server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
              };

mongoose.Promise = global. Promise;
mongoose.connect(config.DBHost);
mongoose.connection
      .once('open', () => {
        console.log('Connected to DB');
				console.log(process.env.NODE_ENV);
      })
      .on('error', (err) => {
        console.warn('Warning', err);
      });

mongoose.export = mongoose;
