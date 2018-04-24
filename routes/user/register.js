////////////////////////////////////////
/////   registration POST route   /////
//////////////////////////////////////

const expressValidator = require("express-validator");
const User = require("../../db/schemas/User");
const Credentials = require("../../db/schemas/Credentials");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { y, r } = require("../../console");

const register = router => {
  router.post("/", (req, res, next) => {
    // req.checkBody('phone', 'Phone number field cannot be empty.').notEmpty();
    // req.checkBody('email', 'Email field cannot be empty.').notEmpty();
    // req.checkBody('email', 'The email you entered in invalid, please try again.').isEmail();
    // req.checkBody('password', 'Password field cannot be empty.').notEmpty();

    // const errors = req.validationErrors();
    // if (errors) {
    //   console.log(r('! Validation Errors !') + '\n' + JSON.stringify(errors, null, 2));
    //   res.json({
    //     errorType: "VALIDATION",
    //     errors
    //   });
    // }

    // Capture key values from registration form
    const { phone, email, password } = req.body;
    console.log(phone, email, password);

    bcrypt.hash(password, saltRounds, function(hashingError, hash) {
      // Create new User instance
      let newUser = new User({ phone, email });
      console.log(newUser);

      // Save new User into DB
      newUser.save(function(err) {
        // if error, handle
        if (err) {
          let msg = "Error creating User";
          console.log(msg + "\n" + err);
          res.json({ msg });
          next();
        }

        // Capcture userId
        let userId = newUser._id;
        // Create credentials store for user
        let credentials = new Credentials({ userId, password: hash });
        // Save credentials
        credentials.save(function(err) {
          // if error, handle
          if (err) {
            let msg = "Error saving User password";
            console.log(msg + "\n" + err);
            res.json({ msg });
            next();
          }

          // Save Credentials reference in User document
          newUser.credentials = credentials;
          // Save changes
          newUser.save(function(err) {
            // if error, handle
            if (err) {
              let msg = "Error creating user credentials reference";
              console.log(msg + "\n" + err);
              res.json({ msg });
              next();
            }

            // if success, redirect
            res.redirect("/login");

          })// end newUser.save() (credentials)

        });// end credentials.save()

      });// end newUser.save()

    });// end bcrypt

  });
  //   bcrypt.hash(password, saltRounds, function(hashingError, hash) {
      
  
};

module.exports = register;

// Test populate method and join User doc with
// its respective Credentials reference
// let userId = "5ac049246e92d355a8ae1fe1";

// User.findById(userId)
//   .populate('credentials')
//   .exec(function(err, user) {
//     if (err) throw err;
//     console.log(user);
//     res.json({ user });
//   });
