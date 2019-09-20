//jshint esversion:6

const express    = require('express'),
      bodyParser = require('body-parser'),
      ejs        = require('ejs');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.render('home');
});

app.get('/login', function(req, res){
  res.render('login');
});

app.get('/register', function(req, res){
  res.render('register');
});




app.listen(PORT, () => console.log(`Server started on port ${PORT}`));