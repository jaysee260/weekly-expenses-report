/////////////////////////////////
/////   login POST route   /////
///////////////////////////////

const login = (router) => {
  router.post('/', /* authenticationFunction, */ (req, res, next) => {
    let returningUser = req.body;
    console.log(returningUser);
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
    res.json({
      msg: 'user authentication capabilites under construction'
    });
    next();
  });
};

module.exports = login;
