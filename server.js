const express = require('express'),
          app = express(),
          morgan = require('morgan'),
          cors = require('cors'),
          bodyParser = require('body-parser'),
          mongoose = require('mongoose'),
          port = process.env.PORT || 3000,
          db = require('./db/connection'),
          {api} = require('./api/api'),
          config = require('config');

// *** App config ***
// Server settings
app.use('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//  Register api
api(app, mongoose);

// Default route to html page
app.use(express.static('public'));

// Start server
app.listen(port, ()=>{
  console.log('Server listening on port ' + port);
  console.log('Env: ' + process.env.NODE_ENV);
});

module.exports = app; // for testing
