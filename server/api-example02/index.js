'use strict';

var express = require('express');
var router = express.Router();


router.post('/deploy', (req, res) => {
    res.status(200).json('ok');
    console.log('deployed !');
});

module.exports = router;