const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// On Save Hook, encrypt password
// Salting a password
// pre: Before saving ('save') a model, run this function

// fix: https://stackoverflow.com/questions/30141492/mongoose-presave-does-not-trigger
// fix2: https://stackoverflow.com/questions/39166700/the-this-object-is-empty-in-presave
//       Don't use ARROW FUNCTIONS
// userSchema.pre('validate', (next) => {
userSchema.pre('validate', function(next) {
  const user = this; // Getting access to the User Model. User is an instance of User Model.

  // Generate a Salt with a 'callback' function
  bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      return next(error);
    }

    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) {
        return next(error);
      }

      // overwrite plain text password with encrypted password 
      user.password = hash;
      next();
    });
  });
});

// Whenever we create a User object
// It's going to have access to any property in this methods 
// fix: Do not use arrow functions if later you want to have access to 'this' 
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  // this -> Is the reference to the user model
  // this.password is the HASHED and SALTED password
  console.log('COMPARING PASSWORD');

  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {

    console.log('isMatch', isMatch);

    if (err) { return callback(err) }

    // callback(error, isMatch)
    callback(null, isMatch);
  });
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;