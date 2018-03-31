////////////////////////////////////////
/////   registration POST route   /////
//////////////////////////////////////

const register = (router) => {
  router.post('/', (req, res, next) => {
    let newUser = req.body;
    console.log(newUser);
    // if conditions pass, redirect to dashboard
    // otherwise, redirect to join with alerts
    res.json({
      msg: 'user registration capabilites under construction'
    });
    next();
  });
};

module.exports = register;
