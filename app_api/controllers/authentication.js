var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.register = function(req, res){

	if(!req.body.user || !req.body.password){
		sendJSONresponse(res, 400, {
			"message":"Usuário e senha não foram fornecido na requisição"
		});
		return;
	}

	var user = new User(req.body.user);
	user.setPassword(req.body.password);

	user.save(function(err){
		var token;
		if(err){
			console.log("ERRO AO SALVAR USUARIO");
			sendJSONresponse(res, 404, err);
		}
		else{
			console.log("SUCESSO AO SALVAR USUARIO"); 
			token = user.generateJwt();
			sendJSONresponse(res, 200, {"token":token});
		}
	});

};

module.exports.login = function(req, res){
	
	if(!req.body.email || !req.body.password){
		sendJSONresponse(res, 400, {"message":"Email e senha não fornecidos na requisição!"});
		return;
	}

	passport.authenticate('local', function(err, user, info){
		
		var token;
		if(err){
			sendJSONresponse(res, 404, err);
			return;
		}
		if(user){
			token = user.generateJwt();
			sendJSONresponse(res, 200, {
				"token":token
			});
		}
		else{
			sendJSONresponse(res, 401, info);
		}

	})(req, res);	

};