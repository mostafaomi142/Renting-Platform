const express = require("express");

const path = require("path");
const rootDir = path.dirname(require.main.filename);

const router = express.Router();


router.get('/profile', (req, res)=>{
    res.sendFile(path.join(rootDir,'views', 'profile.html'));
});

module.exports = router;






  