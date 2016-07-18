var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy(
	
	{
		usernameField: 'email'	
	}, //options

	function(username, password, done){ 
		User.findOne(
			
			{ email: username },
			
			function(err, user){
				
				if(err){
					return done(err);
				}
				
				if(!user){
					return done(null, false, {
						message: 'Email incorreto'
					});
				}

				if(!user.validPassword(password)){
					return done(null, false, {
						message: 'Senha incorreta'
					});
				}

				return done(null, user);

			}	
		);
	}

));