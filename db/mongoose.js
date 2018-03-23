const mongoose = require('mongoose');
const User = require('./schemas/User');
const { db } = require('../config').init();
const dbUri = db.uri
              .replace('<dbname>', db.name)
              .replace('<dbuser>', db.user)
              .replace('<dbpassword>', db.password);
const { r, g } = require('../console');

mongoose.Promise = global.Promise;
mongoose.connect(dbUri);

const mLab = mongoose.connection;
mLab.on('error', function() {
  console.error(r('db connection error...'))
});
mLab.once('open', function() {
  console.log(g('Connected to mLab'));
  User.create({
    firstName: 'Juan Carlos',
    lastName: 'Gonzalez',
    accessToken: 'blablabla'
  }).then((res) => {
    console.log(res);
  }).catch(err => {
    if (err) throw err;
  })
});
