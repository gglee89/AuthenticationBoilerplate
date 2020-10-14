const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// session: false to block passport from doing a cookie-based session
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  app.get('/', requireAuth, (req, res) => {
    res.send('Hi, There!');
  });
  app.post('/signin', requireSignin, Authentication.signin)
  app.post('/signup', Authentication.signup);
}