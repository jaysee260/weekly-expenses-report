const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// The Credentials_Schema represents the structure
// of a Credentials documents. A Credentials document
// houses all the private credentials of a User.

const Credentials_Schema = new Schema({
  userId: { // MongoDB unique ID
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: null
  },
  itemId: { // Plaid's Item ID
    type: String,
    default: null
  }
},
{
  collection: 'Credentials',
  versionKey: false
});

const Credentials = mongoose.model('Credentials', Credentials_Schema);

module.exports = Credentials;
