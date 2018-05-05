const User = require('./db/schemas/User');
const Credentials = require('./db/schemas/Credentials');



// User.findOne({ 'phone': '1234567890' }, 'credentials', function(err, user) {
//   if (err) throw err;
//   Credentials.find({ _id: user.credentials }, function(err, keys) {
//     if (err) throw err;
//     console.log(keys);
//   })
// });