var mongoose = require('mongoose');
var Report = mongoose.model('Report');


var distances = (function(){

	var earthRadius = 6371; //km

	var getKmFromRad = function(rad){
		return parseFloat(rad*earthRadius);
	};

	var getRadFromKm = function(km){
		return parseFloat(km / earthRadius);
	};

	return {
		getKmFromRad: getKmFromRad, 
		getRadFromKm: getRadFromKm
	};

})();

module.exports.getReports = function(req, res){

	var point;
	var geoOptions;

	if( req.params && req.params.lat && req.params.lng && req.params.maxDistance ){

		point = {
			type: "Point",
			coordinates:[req.params.lng, req.params.lat]
		};

		geoOptions = {
			spherical:true,
			maxDistance: distances.getRadFromKm( req.params.maxDistance ),
			num:1000
		};

		Report.geoNear(point, geoOptions, function(err, results, stats){

			var reports = [];
			var resultsLength = results.length;

			if(err){
				res.status(404);
				res.json(err);
			}
			else{

				results.forEach(function(doc){
					reports.push(doc.obj);
					--resultsLength;
					if(resultsLength == 0){
						res.status(200);
						res.json(reports);
					}
				});

			}

		});



	}
	else{
		res.status(404);
		res.json({"message": "No latitude, longitude or maxDistance in request"});
	}


};

module.exports.newReport = function(req, res){

	if(req.body && req.body.report){
		Report.create(req.body.report, function(err, report){
			if(err){
				res.status(404);
				res.json(err);
			}
			else{
				res.status(201);
				res.json(report);
			}
		});
	}
	else{
		res.status(404);
		res.json("message": "No report provided");
	}

};

module.exports.updateReport = function(req, res){

	var reportid = req.params.reportid;
	var newreport = req.params.newReport;

	if(!reportid || !newreport){
		res.status(404);
		res.json({"message":"Report id and newReport are both required"});
		return;
	}

	Report.findById(reportid)
	.exec(function(err, report){
		if(!report){
			res.status(404);
			res.json({"message":"report not found"});
			return;
		}
		else if(err){
			res.status(400);
			res.json(err);
			return;
		}

		report.pos = newreport.pos;
		report.user = newreport.user;
		report.tags = newreport.tags;
		report.victim = newreport.victim;
		report.crime = newreport.crime;
		report.anonymous = newreport.anonymous;
		report.date = newreport.date;
		report.geoCoords = newreport.geoCoords;

		report.save(function(err, report){
			if(err){
				res.status(404);
				res.json(err);
			}
			else{
				res.status(200);
				res.json(report);
			}
		});

	});


};

module.exports.deleteReport = function(req, res){

	var reportid = req.params.reportid;
	if(reportid){
		Report.findByIdAndRemove(reportid)
			.exec(
				function(err, reportRes){
					if(err){
						res.status(404);
						res.json(err);	
					}
					res.status(204);
					res.json({
						"message":"object removed with success",
						"report" : reportRes
					});
				}
			);
	}
	else{
		res.status(404);
		res.json({"message":"No report provided"});
	}

};