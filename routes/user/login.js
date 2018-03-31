/////////////////////////////////
/////   login POST route   /////
///////////////////////////////

const login = (router) => {
  router.post('/', (req, res, next) => {
    let returningUser = req.body;
    console.log(returningUser);
    // if auth successful, redirect to dashboard.
    // otherwise, redirect to login with alert
    res.json({
      msg: 'user authentication capabilites under construction'
    });
    next();
  });
};

module.exports = login;
