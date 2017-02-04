let api = (app, mongoose) => {
  let {userApi} = require('./userApi')

  userApi(app, mongoose);

  app.get('/api', (req, res) => res.json({'message': 'API is answering'}));
};

module.exports = {api};
