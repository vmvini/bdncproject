var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var keys = require('../config/secret');


var validateEmail = function(email){
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

var userSchema = new mongoose.Schema({

	name: {type: String, required:true},
	email: {
		type: String, 
		required:true,
		trim:true, 
		unique:true,
		validate: [validateEmail, 'Email inválido']
	},
	birthDate: {type: Date},
	sex: {
		type: String,
		enum: ['feminino', 'masculino']
	},
	hash: String, 
	salt: String

});

userSchema.methods.setPassword = function(password){
	//One-way password encryption
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64 ).toString('hex');
};

userSchema.methods.validPassword = function(password){
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return hash === this.hash;
};

userSchema.methods.generateJwt = function(){
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7); //seven days from now to expiry

	return jwt.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		exp: parseInt(expiry.getTime() / 1000), //unix time in seconds
		age: this.age
	
	}, keys.getUserSecretKey() );

};




mongoose.model('User', userSchema);

