const express = require("express");

const path = require("path");
const rootDir = path.dirname(require.main.filename);

const router = express.Router();

router.get('/home', (req, res)=>{
    res.sendFile(path.join(rootDir, 'views', 'home.html'));
})

router.post('/home', (req, res)=>{
    res.redirect('/home');
})




module.exports = router;