var jwt = require('express-jwt');

var keys = require('../config/secret');

module.exports.auth = jwt({

	secret: keys.getUserSecretKey(),
	userProperty: 'payload' //define property on req to be payload. result : req.payload

	/*payload is the jwt's body*/

});