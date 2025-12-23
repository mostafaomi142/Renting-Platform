const express = require("express");

const path = require("path");
const rootDir = path.dirname(require.main.filename);

const { login, signup} = require('../controllers/auth');

const router = express.Router();


router.get('/login', (req, res)=>{
    res.sendFile(path.join(rootDir,'views', 'login.html'));
});

router.post('/login', login);


router.get('/signup', (req, res)=>{
    res.sendFile(path.join(rootDir,'views','signup.html'));
});

router.post('/signup', signup);

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;






  