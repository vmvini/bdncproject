var mongoose = require('mongoose');

var userSchema = require('./user');

var coordinateSchema = new mongoose.Schema({

	lat: {type: Number, required:true }
	lng: {type: Number, required:true } 

});


var reportSchema = new mongoose.Schema({

	pos: {
		type: coordinateSchema,
		required:true 
	},

	user:{
		type: userSchema,
		required:true
	}

	tags: [String],

	victim:{ type: Boolean, default: true }

	crime: {
		type: String,
		enum: ['Assédio', 'Estupro', 'Violência'],
		required:true
	},

	anonymous: Boolean,

	date: { type: Date, default: Date.now },

});

