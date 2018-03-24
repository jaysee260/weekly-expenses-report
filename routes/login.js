'use strict';

/////////////////////////////////////
/////   authentication route   /////
////////////////////////////////////

const bodyParser = require('body-parser');
const passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;
const User = require('../db/schemas/User');

const login = (router) => {
  router.use(bodyParser.json());
  passport.use(new LocalStrategy({
      email: 'email',
      password: 'password'
    },

    function(email, password, done) {
      User.findOne({ email: email }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        console.log('success');
        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  router.post('/',
    passport.authenticate('local', {
      successRedirect: '/plaid',
      failureRedirect: '/login',
      failureFlash: true
    }),
    (req, res, next) => {
      console.log(req.body);
      next();
    });
}

module.exports = login;
