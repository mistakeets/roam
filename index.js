"use strict"

require('dotenv').config()
var express = require('express');
var morgan = require('morgan')
var app = express();
var flash = require('connect-flash');
var session = require('express-session');
var db = require('./db/db')
var User = require('./model/user')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('./config/auth')


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true })); // get information from html forms

app.use(morgan('dev'));
app.use(session({secret: 'blahblah', resave: false, saveUninitialized: false}));
app.use(flash());
app.use(express.static('./public'));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


app.get('/login', (req, res) => {
  res.render('login', {
    message: req.flash('loginFailed'),
    user: req.user
  })
})

app.post('/login',
passport.authenticate('login',
    {
      successRedirect : '/profile', // redirect to the secure profile section
      failureRedirect : '/login', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
    }
))

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
  console.log('what is the session?', req.session)
    res.redirect('/')
  })
})

// index page
app.get('/', function(req, res) {
  res.render('index', {user: req.user});
});

app.get('/profile', function(req, res){
  res.render('profile', {
    message: req.flash('signupOk'),
    user: req.user
  })
})

app.get('/signup', function(req, res){
  res.render('signup', {
    message: req.flash('signupFail'),
    user: req.user
  })
})

app.post('/signup', function(req, res){
  var user = User.createUser(req.body.email, req.body.password, req.body.name)
    user.then(function(data){
      req.flash('welcome', 'Welcome to Roam ' + req.body.name + ' , Please login.')
      res.render('login', {message: req.flash('welcome')})
    })
})

var port =  8080;
app.listen(port, function() {
    console.log("Roam server is running on port " + port);
})
