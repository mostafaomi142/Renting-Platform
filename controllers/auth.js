const User = require('../model/auth');

// Signup controller
exports.signup = (req, res, next) => {
  const { name, email, password } = req.body;
  console.log('signup data: ', req.body);

  const user = new User(name, email, password);
  console.log('user object data: ', user);

  user.save()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
};

// Login controller
exports.login = (req, res, next) => {
  const { email, password } = req.body;

  const user = new User(null, email, password); // create a temp user object
  user.isEmailFound()
    .then(foundUser => { // return the full user object from DB
      if (foundUser) {
        req.session.isLoggedIn = true;
        req.session.userId = foundUser.id; // store user ID
        res.redirect('/');
      } else {
        res.send("Email or password not found");
      }
    })
    .catch(err => console.log(err));
};

// Fetch user data
exports.userdata = (req, res, next) => {
  const userId = req.session.userId;

  User.fetchById(userId)
    .then(([rows]) => {
      if (rows.length > 0) {
        const user = rows[0];
        res.render('controlPanel', { user });
      } else {
        res.redirect('/login');
      }
    })
    .catch(err => console.log(err));
};
