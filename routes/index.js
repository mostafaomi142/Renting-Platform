const express = require("express");

const path = require("path");
const rootDir = path.dirname(require.main.filename);

const router = express.Router();

router.get('/', (req, res)=>{
    res.sendFile(path.join(rootDir, 'views', 'home.html'));
})

router.post('/', (req, res)=>{
    res.redirect('/');
})


module.exports = router;