const express = require("express");

const path = require("path");
const rootDir = path.dirname(require.main.filename);

const { login } = require('../controllers/register');

const router = express.Router();


router.get('/login', (req, res)=>{
    res.sendFile(path.join(rootDir,'views', 'login.html'));
})

router.post('/login', login);


module.exports = router;