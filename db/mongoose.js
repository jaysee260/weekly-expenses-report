'use strict';

////////////////////////////////////////////////////////
////////   Handle connection to Database //////////////
///////////////////////////////////////////////////////

const mongoose = require('mongoose');
const { r, y } = require('../console');


module.exports = (dbKeys) => {
  // Enable mongoose promises
  mongoose.Promise = global.Promise;
  // Construct DB URI
  const dbUri = dbKeys.uri
              .replace('<dbname>', dbKeys.name)
              .replace('<dbuser>', dbKeys.user)
              .replace('<dbpassword>', dbKeys.password);

  // Establish connection to DB
  mongoose.connect(dbUri);
  // Create connection reference
  const mLab = mongoose.connection;
  // Create DB event listeners
  mLab.on('error', function() {
    console.error(r('db connection error...'))
  });
  mLab.once('open', function() {
    console.log(y('Connected to mLab'));
  });
}
