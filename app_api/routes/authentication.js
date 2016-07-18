var express = require('express');
var router = express.Router();

var authCtlr = require('../controllers/authentication');


router.post('/register', authCtlr.register);

router.post('/login', authCtlr.login );


module.exports = router;
