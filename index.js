"use strict"

var express = require('express');

var morgan = require('morgan')
var app = express();
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var db = require('./db/db');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var LocalStrategy = require('passport-local').Strategy;

// user model
var User = require('./model/user');

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.use(morgan('dev'));
app.use(session({secret: 'blahblah', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
app.use(express.static('./public'));

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
})

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

app.get('/login', (req, res) => {
  res.render('login', {message: req.flash('loginFailed')})
})

app.post('/login',
passport.authenticate('login',
    {
      successRedirect : '/profile', // redirect to the secure profile section
      failureRedirect : '/login', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
    }
))

// index page
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', function(req, res){
  res.render('profile')
})

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
