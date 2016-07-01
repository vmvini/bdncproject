var index = function(req, res){
	res.render('index', {title:'Express'});
};

var vmvini = function(req, res){
	res.render('index', {title:'vmvini'} );
};

module.exports.index = index;
module.exports.vmvini = vmvini;