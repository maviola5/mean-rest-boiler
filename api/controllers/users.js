var mongoose = require('mongoose');
// var User = mongoose.model('Users');

var sendJSONresponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.userinfo = function(req, res){
	var userinfo = {};
	userinfo.name = 'Web Stranger';
	userinfo.jobTitle = 'Web Guy';
	userinfo.userName = 'Web Stranger';
	sendJSONresponse(res, 200, userinfo)
};