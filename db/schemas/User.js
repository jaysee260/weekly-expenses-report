const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  phone: {
    type: String,
    required: [true, 'A phone number is required to register.'],
    unique: true // look into a graceful way of handling unique error
  },
  // For now only US numbers supported,
  // hence default to +1. Later will be required
  // as part of registration form (choose country from options)
  countryCode: {
    type: String,
    default: "+1"
  },
  email: {
    type: String,
    required: [true, 'An email address is required to register.'],
    unique: true
    // look into some sort of regex validation
  },
  password: {
    type: String,
    required: [true, 'A password is required to register.']
    // look into this being a reference to a 
    // collection of hashed passwords associated
    // with user IDs
  },
  bioInf: {
    firstName: {
      type: String,
      default: null
    },
    lastName: {
      type: String,
      default: null
    },
    age: {
      type: Number,
      min: 15,
      default: null
    },
    gender: {
      type: String,
      validate: {
        validator: (v) => (v === 'M' || v === 'F'),
        message: 'Please select one of the available options.'
      }
    }
  },
  hasAccessToken: {
    type: Boolean,
    default: false
  },          
  accessToken: {
    type: String,
    default: null
  },
  itemId: {
    type: String,
    default: null
  },
  joinedOn: {
    type: Date,
    default: Date.now
  }
},
{ 
  collection: 'Users',
  versionKey: false
});


const User = mongoose.model('User', UserSchema);

// UserSchema.statics.register = function(user) {
//   return new Promise(function(resolve, reject) {
//     User.create(user)
//       .then(doc => resolve(doc))
//       .catch(err => reject(err))
//   });
// };

// UserSchema.methods.register = function(user, cb) {
//   return this.create(user, cb);
// };

module.exports = User;
