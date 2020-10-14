const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Logic to setup passport
// Passport will help authenticate user
// Safe guard routes that needs to be protect with an authentication layer
// Confirm users are logged in before 

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // Verify this email and passwpord, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({ email }, (err, user) => {
    if (err) { return done(err) }
    // done(error, isFound)
    if (!user) { return done(null, false) }

    // compare password = is 'password' supplied by UserRequest equal to user.password?
    user.comparePassword(password, (error, isMatch) => {
      if (err) { return done(error) }
      if (!isMatch) { return done(null, false) }

      return done(null, user);
    });
   });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if the user ID in the payload exists in our database
  // if it does, call 'done' with that user
  // otherise, call done without a user object
  User.findById(payload.sub, (err, user) => {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });

});


// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
