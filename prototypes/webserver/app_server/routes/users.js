var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/vmvini/:id', function(req, res, next){
	res.send('vmvini foi requisitado' + req.params.id);
});

module.exports = router;
