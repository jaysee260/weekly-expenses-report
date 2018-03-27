'use strict';

///////////////////////////
/////   root route   /////
/////////////////////////

const bodyParser = require('body-parser');

const root = (router) => {
  router.use(bodyParser.json());
  router.use((req, res, next) => {
    res.render('index', { 
      msg: 'Welcome to my humble app :)'
    });
  });
}

module.exports = root;
