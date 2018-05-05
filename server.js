'use strict';

/////////////////////////////
/////   Master Server   /////
/////////////////////////////

//////////////////////////////////////
///// Bring in dependencies, etc /////
//////////////////////////////////////

const path = require('path');
const express = require('express');
const expressValidator = require('express-validator');
const engines = require('consolidate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const keys = require('./config');

// Authentication Packages
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./db/schemas/User');
const Credentials = require('./db/schemas/Credentials');


// Colors for console messages
const { y, m, g, r, b } = require('./console');

const app = express();
const port = keys.port;
const dbKeys = keys.init().db;

////////////////////////////
///// DB Configuration /////
////////////////////////////

require('./db/mongoose')(dbKeys);

///////////////////////////////////
///// Passport Configurations /////
///////////////////////////////////

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy({
    usernameField: 'login'
  },
  function(login, password, cb) {
    // Find reference to credentials of user where login value equals phone or email
    User.findOne({ 
      '$or': [
      { 'phone': login },
      { 'email': login } ]
    }, 'credentials', function(err, user) {
      if (err) cb(err);
      // Find the password for the retrieved user
      Credentials.find({ _id: user.credentials }, 'password', function(err, keys) {
        if (err) cb(err);
        // If no user was found, return null
        if (!user) { return cb(null, false, { message: 'User not found' }); }
        // If user was found and the password matches, return the user
        let hash = keys[0].password;
        console.log(password, hash)
        bcrypt.compare(password, hash, function(err, isMatch) {
          if (err) throw err;
          console.log('comparing...');
          return isMatch ? cb(null, user) : cb(null, false, { message: 'Invalid password' });
        });
        
      })
    });
  }));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

///////////////////////////////
///// Register Middleware /////
///////////////////////////////

app.use(logger('dev'));
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
  secret: 'merkmerk',
  resave: false,
  saveUninitialized: false
  // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/plaid', express.static('public'));
app.use('/join', express.static('public'));
app.use('/login', express.static('public'));

////////////////////////////////////////////////
///// Routes registration and configuration ////
////////////////////////////////////////////////

const root = express.Router();
const user = express.Router();
const sms = express.Router();
const plaid = express.Router();

require('./routes/root')(root);
require('./routes/user')(user);
require('./routes/sms')(sms);
require('./routes/plaid')(plaid);

/////////////////////////
///// API Catalogue /////
/////////////////////////

// Root route
app.get('/', root); // other routes are inaccessible if we use app.use here...
// User route
app.use('/user', user);
// SMS route
app.use('/api/sms', sms);
// Plaid route
app.use('/api/plaid', plaid);

//////////////////////////
///// Spin up server /////
//////////////////////////

app.listen(port, () => {
  console.log(m(`Master server listening on port ${port}`));
});
