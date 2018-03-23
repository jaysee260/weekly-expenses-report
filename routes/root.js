'use strict';

///////////////////////////
/////   root route   /////
/////////////////////////

const bodyParser = require('body-parser');

const root = (router) => {
  router.use(bodyParser.json());
  router.use((req, res, next) => {
    res.send('up and running!');
    next();
  });
}

module.exports = root;
