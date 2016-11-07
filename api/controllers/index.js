var mongoose = require('mongoose');
// var yourModel = mongoose.model('yourModel');

var sendJSONresponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.hello = function(req, res){
	var content = {};
	content.message = 'Hey there MEAN boy!';
	sendJSONresponse(res, 200, content);
};