let api = (app, mongoose) => {
  app.get('/api', (req, res) => res.json({'message': 'API is answering'}));
};

module.exports = {api};
