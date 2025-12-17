const express = require("express");

const path = require("path");
const rootDir = path.dirname(require.main.filename);

const { login } = require('../controllers/register');
const { signup } = require('../controllers/register');

const router = express.Router();


router.get('/login', (req, res)=>{
    res.sendFile(path.join(rootDir,'views', 'login.html'));
});

router.post('/login', login);


router.get('/signup', (req, res)=>{
    res.sendFile(path.join(rootDir,'views','signup.html'));
});

router.post('/signup', signup);

module.exports = router;






  