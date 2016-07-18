var mongoose = require('mongoose');
var User = mongoose.model('User');


function useridBehavior(req, res, callback, validation){
	
	var userid;
	var isValid = {

		test: null, 
		message: null

	};
	
	if(!validation){
		isValid.test = function(){
			userid = req.params.userid;
			if(!userid){
				isValid.message = "user id is required";
				return false;
			}
		};
	}
	else{
		isValid = validation;
	}

	 
	
	if( !isValid.test() ){
		res.status(404);
		res.json({"message": isValid.message });
		return;
	}
	else{

		User.findById(userid)
		.exec(function(err, user){
			if(err){
				res.status(400);
				res.json(err);
			}
			else if(!user){
				res.status(404);
				res.json({"message":"user not found!"});
			}
			else{
				callback(user);
			}
		});

		
	}
}

module.exports.getUserById = function(req, res){

	useridBehavior(req, res, function(user){
		res.status(200);
		res.json(user);
	});

};

/*
module.exports.createUser = function(req, res){

	var user = req.body.user;
	if(!user){
		res.status(404);
		res.json({"message":"user object is required"});
	}
	else{
		User.create(user, function(err, userResult){
			if(err){
				res.status(404);
				res.json(err);
			}
			else{
				res.status(201);
				res.json(userResult);
			}
		});
	}

};*/

module.exports.updateUser = function(req, res){

	var updateUser = req.params.updateUser;

	var validation = {

		test : function(){
			if(!req.params.userid || !updateUser){
				return false;
			}
			else{
				return true;
			}
		},

		message: "both userid and updateUser are required!"

	};


	useridBehavior(req, res, function(user){
		
		user.name = updateUser.name;
		user.age = updateUser.age;
		user.email = updateUser.email;

		user.save(function(err, userResult){
			if(err){
				res.status(404);
				res.json(err);
			}
			else{
				res.status(200);
				res.json(userResult);
			}
		});


	}, validation );

};


module.exports.removeUser = function(req, res){

	useridBehavior(req, res, function(user){
		user.remove(function(err, removedUser){
			if(err){
				res.status(404);
				res.json(err);	
				return;
			}
			res.status(204);
			res.json({
				"message":"user removed with success",
				"report" : removedUser
			});
		});
	});

};