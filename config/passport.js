const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');


// Load User model
const User = require('../models/user');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({
      usernameField: 'email'
    }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, {
            message: 'That email is not registered'
          });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: 'Password incorrect'
            });
          }
        });
      });
    })
  );



  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // console.log(`id: ${id}`);
    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  });
}