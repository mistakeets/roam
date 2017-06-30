var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

passport.use('login', new LocalStrategy(
  {usernameField: 'email', passwordField: 'password', passReqToCallback: true, session: true},
  function(req, username, password, done) {
    var user = User.isValidUser(username, password);
    user.then(
      function(result) {
        console.log('ok')
        done(null, result)
      }
    ).catch(
      function(err) {
        console.log('fail')
        done(null, false, req.flash('loginFailed', 'No user found.'))
      }
    )
  }
))

passport.serializeUser((user, done) => {
  done(null, user.email);
})

passport.deserializeUser(function(email, done) {
  User.findByEmail(email)
    .then(user => {
      done(null, user);
    })
})
