'use strict';

// invokes plaid method that generates access token

const plaidClient = require('../../api/plaid/index');
const User = require('../../db/schemas/User');

const getAccessToken = (router) => {
  router.post('/', (req, res, next) => {
    console.log('you\'ve reached get_access_token route');
    // Capture public_token sent by Plaid Link Module
    let public_token = req.body.public_token;
    console.log(`Public Token: ${public_token}`);

    // Get an access_token using public_token
    plaidClient.exchangePublicToken(public_token, (error, tokenResponse) => {
       // If err, log it && notify client-side
       if (error != null) {
        var msg = 'Could not exchange public_token!';
        console.log(msg + '\n' + error);
        res.json({
          error: msg
        });
        next();
      }

      // Retrieve user id from db...
      // Store user specific access_token and item_id
      // in persistent data store
      const userId = '';
      console.log(`Access Token: ${tokenResponse.access_token}`);
      console.log(`Item ID: ${tokenResponse.item_id}`);
      console.log(`userId: ${userId}`);
      User.findByIdAndUpdate(userId, {
        $set: {
          accessToken: tokenResponse.access_token,
          itemId: tokenResponse.item_id
        }
      }).then(doc => {
        console.log(`Plaid credentials saved for user ${doc.firstName} ${doc.lastName}`);
        // Respond to client
        res.json({
          status: 'under construction...',
          msg: 'you\'ve reached get_access_token route.',
          error: false
        });
        next();
      }).catch(err => {
        let msg = 'There was an error saving user credentials';
        console.log(msg + '\n' + err);
        res.json({
          error: msg
        })
      })

    })
  });
}

module.exports = getAccessToken;
