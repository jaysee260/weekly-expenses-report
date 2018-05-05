/////////////////////////////////
/////   login POST route   /////
///////////////////////////////

const passport = require('passport');


const login = (router) => {
  router.post('/',
    passport.authenticate('local', { successRedirect:'/join', failureRedirect: '/login' }),
    (req, res, next) => {
    console.log(req.user);
    // if auth successful, redirect to dashboard.
    // otherwise, redirect to login with alert

    // 1. Use value of username field to search
    //    for user by email or number - $or: { phone, email }
    // 2. If User not found, notify and redirect to login (send back msg)
    // 3. If User found and authentication successful, redirect to dashboard

    // 3.1. IF User is found by number or email, retrieve _id
    // 3.2. With _id at hand, look in Credentials collection by userId
    // 3.2  Compare hashes (password). MAKE SURE TO HASH PASSWORD ON FRONT END;
    //      DO NOT SEND OVER PLAIN PASSWORD.
    // res.json({
    //   msg: 'user authentication capabilites under construction'
    // });
    res.redirect('/');
    next();
  });
};

module.exports = login;
