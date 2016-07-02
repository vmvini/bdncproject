var mongoose = require('mongoose');


var mongoURI = "mongodb://localhost/womenviolence";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err) { 
	console.log(err.message); 
});

MongoDB.once('open', function() {
  console.log("mongodb connection open");
});