'use strict';

// invokes plaid method that retrieves transactions
const moment = require('moment');
const plaidClient = require('../../api/plaid/index');
const User = require('../../db/schemas/User');

const transactions = (router) => {
  router.post('/:userId', (req, res, next) => {
    let msg;
    // Capture user _id to retrieve credentials
    let userId = req.params.userId;
    // Retrieve user's plaid credentials
    User.findById(userId, { accessToken: 1 })
      .then(user => {
        msg = 'User found';
        console.log(msg + '\n' + user);
        let startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
        let endDate = moment().format('YYYY-MM-DD');
        // Retrieve transactions for the past 7 days
        plaidClient.getTransactions(user.accessToken, startDate, endDate, {
          count: 10, // will need more eventually
          offset: 0
        }, function(error, transactionsResponse) {
          if (error != null) {
            msg = 'Error pulling transactions';
            console.log(msg + '\n' + JSON.stringify(error));
            res.json({
              error: msg
            });
            next();
          }

          msg = 'Pulled ' + transactionsResponse.transactions.length + ' transactions';
          console.log(msg + '\n' + transactionsResponse);
          res.json({
            msg: msg,
            transactions: transactionsResponse
          });
          next();
        });
        
      })
      .catch(err => {
        msg = 'User not found';
        console.log(msg + '\n' + err);
        res.json({
          error: msg
        });
        next()
      })

  });
}

module.exports = transactions;
