var express = require('express');
var morgan = require('morgan')
var app = express();
var passport = require('passport');
var db = require('./db/db');

// user model
var User = require('./model/user')(db)

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(morgan('dev'));

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  done(err, user)
})

passport.use(new LocalStrategy(
    {usernameField: 'username', passwordField: 'password'},
    function(username, password, done) {
      User.isValidUser(username, password, done)
    }
))

// index page
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/signup', function(req, res){
  res.render('signup')
})

app.get('/login', function(req, res){
  res.render('login')
})

var port =  8080;
app.listen(port, function() {
    console.log("Roam server is running on port " + port);
})
