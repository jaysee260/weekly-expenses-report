'use strict';

///////////////////////////////////////////////////
/////  process requests for plaid services   /////
/////////////////////////////////////////////////

const bodyParser =  	    require('body-parser');

const getAccesToken =     require('express').Router();
const accounts =          require('express').Router();
const transactions =      require('express').Router();

// register routes for each plaid task
require('./plaid/getAccessToken')(getAccesToken);
require('./plaid/accounts')(accounts);
require('./plaid/transactions')(transactions);

const plaid = (router) => {
  router.use(bodyParser.json());
  // api/plaid/get_access_token
  router.use('/get_access_token', getAccesToken);
  // api/plaid/accounts
  router.use('/accounts', accounts);
  // api/plaid/transactions
  router.use('/transactions', transactions);
}

module.exports = plaid;
