var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static('./public'));

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
