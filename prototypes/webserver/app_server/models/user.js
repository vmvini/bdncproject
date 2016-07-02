var mongoose = require('mongoose');


var validadeEmail = function(email){
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

var userSchema = new mongoose.Schem({

	name: {type: String, required:true},
	age: {type: Number, required:true},
	email: {
		type: String, 
		required:true,
		trim:true, 
		unique:true,
		validate: [validateEmail, 'Email inválido']
	},
	password: {type: String, required:true }, 
	imagePath: {type:String, required:true }

});