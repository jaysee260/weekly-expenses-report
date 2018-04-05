////////////////////////////////////////
/////   registration POST route   /////
//////////////////////////////////////

const expressValidator = require('express-validator');
const User = require('../../db/schemas/User');
const Credentials = require('../../db/schemas/Credentials');
const { y, r } = require('../../console');

const register = (router) => {

  router.post('/', (req, res, next) => {

    req.checkBody('phone', 'Phone number field cannot be empty.').notEmpty();
    req.checkBody('email', 'Email field cannot be empty.').notEmpty();
    req.checkBody('email', 'The email you entered in invalid, please try again.').isEmail();
    req.checkBody('password', 'Password field cannot be empty.').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
      console.log(r('! Validation Errors !') + '\n' + JSON.stringify(errors, null, 2));
      res.json({
        errorType: "VALIDATION",
        errors 
      });
    }

    // Capture key values from registration form
    const { phone, email, password } = req.body;
    console.log(phone, email, password);

    /*
      HERE - PERFORM SOME SORT OF BACK END VALIDATION
      AND RESPOND ACCORDINGLY OR PROCEED. AVOID EVEN
      TRYING TO CREATE A NEW USER WITH POTENTIALLY
      FAULTY DATA
    */

    // Validation for unique phone and email can be handled
    // by Schema rules. Although we can also check it live
    // from the front end after a field loses focus and display 
    // a tooltip :)

    // Create new User instance
    // let newUser = new User({ phone, email, password });
    // console.log(newUser);
    // // Save new User into DB
    // newUser.save(function(err) {
    //   // if error, handle
    //   if (err) {
    //     let msg = 'Error creating User';
    //     console.log(msg + '\n' + err);
    //     res.json({ msg });
    //     next();
    //   }

    //   // Capcture userId
    //   let userId = newUser._id;
    //   // Create credentials store for user
    //   let credentials = new Credentials({ userId, password });
    //   // Save credentials
    //   credentials.save(function(err) {
    //     // if error, handle
    //     if (err) {
    //       let msg = 'Error saving User password';
    //       console.log(msg + '\n' + err);
    //       res.json({ msg });
    //       next()
    //     }

    //     // Save Credentials reference in User document
    //     newUser.credentials = credentials;
    //     // Save changes
    //     newUser.save(function(err) {
    //       // if error, handle
    //       if (err) {
    //         let msg = 'Error creating user credentials reference';
    //         console.log(msg + '\n' + err);
    //         res.json({ msg });
    //         next()
    //       }

    //       // if success, redirect
    //       res.redirect('/login');
    //     });
    //   });

    // });

  });

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
