const express = require('express');
const app = express();

app.use(express.json());        
app.use(express.urlencoded({ extended: true }));

const User = require('../model/auth'); 

exports.signup = (req, res, next) => {
  const { name, email, password } = req.body;
  console.log('signup data: ', req.body);

  const user = new User(name, email, password);
  console.log('user object data: ', user);

  user.save()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
};



exports.login = (req, res, next) => {
  const { email, password } = req.body;

  const user = new User(null, email, password);

  user.isEmailFound()
    .then(found => {
      if (found) {
        res.redirect('/');
      } else {
        res.send("Email or password not found");
      }
    })
    .catch(err => console.log(err));
};
