const User            = require("../../db/schemas/User");
const Credentials     = require("../../db/schemas/Credentials");
const assert          = require('assert');
const bcrypt          = require("bcrypt");
const saltRounds      = 10;


async function registerNewUser(request_body) {
  // Capture key values from registration form
  const { phone, email, password } = req.body;

  // Hash the password; save hash as user's password field
  bcrypt.hash(password, saltRounds, function(hashingError, hash) {
    // Create new User instance
    let newUser = new User({ phone, email });

    let user_promise = newUser.save();
    assert.ok(user_promise instanceof Promise);

    user_promise.then(user => {
      // Capture user _id
      let userId = user._id;

      // Create credentials instance and associate it with user
      let credentials = new Credentials({ userId, password: hash });

      // Save credentials
      let credentials_promise = credentials.save();
      assert.ok(credentials_promise instanceof Promise);

      credentials_promise.then(creds => {
        // Save reference to credentials in User document
        


      })
      .catch(err => {
        throw err;
      })

    })
    .catch(err => {
      throw err;
    });

  })

}