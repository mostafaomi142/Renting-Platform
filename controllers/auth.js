const User = require('../model/User');

// Signup controller
exports.signup = (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = new User(name, email, password, role || 'user');

  user.save()
    .then(() => res.redirect('/login'))
    .catch(err => console.log(err));
};

// Login controller
exports.login = (req, res, next) => {
  const { email, password } = req.body;

  const user = new User(null, email, password); // create a temp user object
  user.isUserFound()
    .then(foundUser => { // return the full user object from DB
      if (foundUser) {
        req.session.isLoggedIn = true;
        req.session.userId = foundUser.id; // store user ID
        req.session.userRole = foundUser.role; // store user role
        if (foundUser.role === 'owner') {
          res.redirect('/controlPanel');
        } else {
          res.redirect('/');
        }
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
