var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('site/index');
});

var port =  8080;
app.listen(port, function() {
    console.log("Roam server is running on port " + port);
})