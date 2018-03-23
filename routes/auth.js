'use strict';

/////////////////////////////////////
/////   authentication route   /////
////////////////////////////////////

const bodyParser = require('body-parser');
const passport = require('passport');

const auth = (router) => {
  router.use(bodyParser.json());
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

module.exports = auth;
