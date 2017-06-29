passport.use('login', new LocalStrategy(
    {usernameField: 'email', passwordField: 'password', passReqToCallback: true, session: true},
    function(req, username, password, done) {

      var user = User.isValidUser(username, password);
      user.then(
          function() {
            console.log('ok')
            user.resolve(done(null, user));
          }
      ).catch(
          function() {
            console.log('fail')
            user.reject(done(null, false, req.flash('loginFailed', 'No user found.')))
          }
      )
    }
))

passport.serializeUser((user, done) => {
  done(null, user.username);
})

passport.deserializeUser(function(username, done) {
  User.find(username)
    .then(user => {
      done(null, user);
    })
})
