'use strict';

// invokes plaid method that retrives accounts

const accounts = (router) => {
  router.get('/', (req, res, next) => {
    console.log('you\'ve reached accounts route');
    res.json({
      status: 'under construction...',
      msg: 'you\'ve reached accounts route.'
    });
    next();
  });
}

module.exports = accounts;