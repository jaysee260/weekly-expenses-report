'use strict';

// invokes plaid method that retrives accounts
const plaidClient = require('../../api/plaid/index');
const User = require('../../db/schemas/User');
const send_sms = require('../../api/twilio/send_sms');

const accounts = (router) => {
  router.get('/:userId', (req, res, next) => {
    let msg;
    // Capture user _id to retrieve credentials
    let userId = req.params.userId;
    // Retrieve user's plaid credentials
    User.findById(userId, { accessToken: 1 })
      .then(user => {
        msg = 'User found';
        console.log(msg + '\n' + user);
        // Retrieve high-level account information and account and routing numbers
        // for each account associated with the Item.
        plaidClient.getAuth(user.accessToken, function(error, authResponse) {
          if (error != null) {
            msg = 'Unable to pull accounts from the Plaid API.';
            console.log(msg + '\n' + error);
            res.json({
              error: msg
            });
            next();
          }

          msg = 'Pulled ' + authResponse.accounts.length + ' accounts';
          console.log(msg + '\n' + authResponse.accounts);
          let checking = authResponse.accounts.filter(acct => acct.subtype === 'checking');
          let sms = `Account: ${checking[0].name}\nBalance: $${checking[0].balances.current}`;
          // Send sms with mock summary containing one account name and its balance
          // Ideally, this would return a Promise so that we could safely
          // res.json() after we get verification the sms has sent, or so
          // we can catch an error if it occurs.
          send_sms(sms);
          res.json({
            sms: {
              body: sms,
              sent: true
            },
            msg: msg,
            accounts: authResponse.accounts,
            numbers: authResponse.numbers
          });
          next();

        });
      })
      .catch(err => {
        msg = 'User not found';
        console.log(msg + '\n' + err);
        res.json({
          msg: msg
        });
        next()
      })

  });
}

module.exports = accounts;
