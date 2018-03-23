'use strict';

///////////////////////////////////////
/////   user registration route   ////
//////////////////////////////////////

const bodyParser = require('body-parser');
const User = require('../db/schemas/User');

const register = (router) => {
  router.use(bodyParser.json());
  router.post('/', (req, res, next) => {
      let newUser = req.body;
      User.create(newUser)
        .then(doc => {
          console.log(`New User created: ${doc}`);
          res.redirect('/login');
          next();
        })
        .catch(err => {
          let msg = 'There was an error creating user'
          console.log(msg + '\n' + err);
          res.json({
            err: msg
          });
          next();
        });
  });
}

module.exports = register;
