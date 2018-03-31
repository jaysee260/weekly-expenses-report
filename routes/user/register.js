////////////////////////////////////////
/////   registration POST route   /////
//////////////////////////////////////

const User = require('../../db/schemas/User');

const register = (router) => {
  router.post('/', (req, res, next) => {
    let newUser = req.body;
    console.log(newUser);
    // if conditions pass, redirect to dashboard
    // otherwise, redirect to join with alerts
    // res.redirect('/join');
    User.create(newUser)
      .then(user => {
        let msg = 'User created';
        console.log(msg + '\n' + user);
        res.json({ msg });
        next();
      })
      .catch(err => {
        let msg = 'Error creating user';
        console.log(msg + '\n' + err);
        res.json({ msg });
        next();
      });
  });
};

module.exports = register;



// let newUser = new User(req.body);
// User.register(newUser, function(err, user) {
//   if (err) {
//     let msg = 'Error creating user';
//     console.log(msg + '\n' + err);
//     res.json({ msg });
//     next();
//   }

//   let msg = 'User created';
//   console.log(msg + '\n' + user);
//   res.json({ msg });
//   next();

// });

// res.json({
//   msg: 'user registration capabilites under construction'
// });
// next();