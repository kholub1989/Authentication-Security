//jshint esversion:6

require('dotenv').config();
const express    = require('express'),
      bodyParser = require('body-parser'),
      ejs        = require('ejs'),
      mongoose   = require('mongoose'),
      encrypt    = require('mongoose-encryption');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/userDB',
{
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const userSchema = new mongoose.Schema ({
  email: String,
  password: String
});


userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });

const User = new mongoose.model('User', userSchema);

app.get('/', function(req, res){
  res.render('home');
});

app.get('/login', function(req, res){
  res.render('login');
});

app.get('/register', function(req, res){
  res.render('register');
});

app.post('/register', function(req, res){
  const newUser = new User({
    email: req.body.username,
    password: req.body.password
  });
  newUser.save(function(err){
    if (err) {
      console.log(err);
    } else {
      res.render('secrets')
    }
  });
});

app.post('/login', function(req, res){
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({email: username}, function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.render('secrets')
        }
      }
    }
  });
});



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));