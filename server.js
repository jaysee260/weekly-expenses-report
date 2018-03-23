'use strict';

/////////////////////////////
/////   Master Server   /////
/////////////////////////////

//////////////////////////////////////
///// Bring in dependencies, etc /////
//////////////////////////////////////

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const logger = require('morgan');
const keys = require('./config');

// Colors for console messages
const { y, m, g, r, b } = require('./console');

const app = express();
const port = keys.port;
const dbKeys = keys.init().db;

////////////////////////////
///// DB Configuration /////
////////////////////////////

require('./db/mongoose')(dbKeys);

///////////////////////////////
///// Register Middleware /////
///////////////////////////////

app.use(logger('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/register', express.static('public'));
app.use('/login', express.static('public'));
app.use('/plaid', express.static('public'));


////////////////////////////////////////////////
///// Routes registration and configuration ////
////////////////////////////////////////////////

const root = express.Router();
const register = express.Router();
const auth = express.Router();
const sms = express.Router();
const plaid = express.Router();

require('./routes/root')(root);
require('./routes/register')(register);
require('./routes/auth')(auth);
require('./routes/sms')(sms);
require('./routes/plaid')(plaid);

/////////////////////////
///// API Catalogue /////
/////////////////////////

// Root route
app.get('/', root); // other routes are inaccessible if we use app.use here...
// User registration route
app.use('/register', register);
// Authentication route
app.use('/login', auth);
// SMS route
app.use('/api/sms', sms);
// Plaid API route
app.use('/api/plaid', plaid);

//////////////////////////
///// Spin up server /////
//////////////////////////

app.listen(port, () => {
  console.log(m(`Master server listening on port ${port}`));
});
