'use strict';

// invokes plaid method that retrieves transactions

const transactions = (router) => {
  router.post('/', (req, res, next) => {
    console.log('you\'ve reached transactions route');
    res.json({
      status: 'under construction...',
      msg: 'you\'ve reached transactions route.'
    });
    next();
  });
}

module.exports = transactions;