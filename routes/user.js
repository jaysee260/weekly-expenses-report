'use strict';

///////////////////////////////////////////////////
/////  process requests for plaid services   /////
/////////////////////////////////////////////////

const bodyParser =  	    require('body-parser');

const register =     require('express').Router();
const login =         require('express').Router();

// register routes for user registration and authentication
require('./user/register')(register);
require('./user/login')(login);

const user = (router) => {
  router.use(bodyParser.json());
  // user/join
  router.use('/register', register);
  // user/login
  router.use('/login', login);
}

module.exports = user;
