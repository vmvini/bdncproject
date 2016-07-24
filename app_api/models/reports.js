var mongoose = require('mongoose');

var coordinateSchema = new mongoose.Schema({

	lat: {type: Number, required:true },
	lng: {type: Number, required:true } 

});

var reportSchema = new mongoose.Schema({
	pos: {
		type: coordinateSchema,
		required:false 
	},

	address: String,

	tags: [String],

	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

	victim:{ type: Boolean, default: false },

	crime: {
		type: String,
		enum: ['Assédio', 'Estupro', 'Violência'],
		required:false
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