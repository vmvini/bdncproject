var mongoose = require('mongoose');

var userSchema = require('./user').userSchema;

var coordinateSchema = new mongoose.Schema({

	lat: {type: Number, required:true },
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
	},

	tags: [String],

	victim:{ type: Boolean, default: true },

	crime: {
		type: String,
		enum: ['Assédio', 'Estupro', 'Violência'],
		required:true
	},

	anonymous: Boolean,

	date: { type: Date, default: Date.now },


	//must be an array in this order [lng, lat] 
	geoCoords: { type: [Number], index: '2dsphere', required:true }

});

reportSchema.methods.setGeoCoords = function(){
	var coords = [];
	coords.push(this.pos.lng, this.pos.lat);
	this.geoCoords = coords;
};


mongoose.model('Report', reportSchema );