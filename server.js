'use strict';

/////////////////////////////
/////   Master Server   /////
/////////////////////////////

//////////////////////////////////////
///// Bring in dependencies, etc /////
//////////////////////////////////////

const express = require('express');
// const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const logger = require('morgan');
const keys = require('./config');

// Colors for console messages
const { y, m, g, r, b } = require('./console');

const app = express();
const port = keys.port;

///////////////////////////////
///// Register Middleware /////
///////////////////////////////

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

////////////////////////////////////////////////
///// Route registration and configuration /////
////////////////////////////////////////////////

const root = express.Router();
const sms = express.Router();

require('./routes/root')(root);
require('./routes/sms')(sms);

/////////////////////////
///// API Catalogue /////
/////////////////////////

// Root route
app.use('/', root);
// SMS route
app.use('/sms', sms);

//////////////////////////
///// Spin up server /////
//////////////////////////

app.listen(port, () => {
  console.log(m(`Master server listening on port ${port}`));
});
