var uglifyJs = require('uglify-js');
var fs = require('fs');

var files = [
	'app_client/app.js',
	'app_client/controllers/indexCtrl.js',
	'app_client/controllers/reportModalCtrl.js',
	'app_client/controllers/userRegisterCtrl.js',
	'app_client/controllers/loginCtrl.js',
	'app_client/controllers/authUserCtrl.js',
	'app_client/controllers/searchReportsCtrl.js',
	'app_client/service/authentication.js',
	'app_client/service/reports.js',
	'app_client/service/users.js',
	'app_client/service/maps.js',
	'app_client/service/geocoding.js'
	
];

var uglified = uglifyJs.minify(files, {compress:false});

fs.writeFile('public/angular_app/harassmentMap.min.js', uglified.code, function(err){

	if(err){
		console.log(err);
	}
	else{
		console.log("public/angular/harassmentMap.min.js construido com sucesso!");
	}

});