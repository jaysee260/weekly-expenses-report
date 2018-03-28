/////////////////////////////////
/////   login POST route   /////
///////////////////////////////

const login = (router) => {
  router.post('/', (req, res, next) => {
    res.json({
      msg: 'user authentication capabilites under construction'
    });
    next();
  });
};

module.exports = login;
