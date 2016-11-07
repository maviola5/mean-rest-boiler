var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Author = mongoose.model('Author');

var sendJSONresponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

var errMessage = "Something went wrong";

module.exports.getAuthors = function(req, res){
	Author.find({}, function(err, docs){
		if(err){
			sendJSONresponse(res, 400, err);
		}

		sendJSONresponse(res, 200, docs);
	});
};

module.exports.getAuthor = function(req, res){
	if(!req.params && !req.params.authorid){
		sendJSONresponse(res, 400, errMessage);
	}

	var id = req.params.authorid;

	Author.findById(id, function(err, doc){
		if(err){
			sendJSONresponse(res, 400, err);
		}
		sendJSONresponse(res, 200, doc);
	});

	
};

module.exports.createAuthor = function(req, res){
	if(!req.body){
		sendJSONresponse(res, 400, errMessage);
	}

	var author = new Author();

	if(req.body.firstname){
		author.firstname = req.body.firstname;
	}
	if(req.body.middlename){
		author.middlename = req.body.middlename;
	}
	if(req.body.lastname){
		author.lastname = req.body.lastname;
	}


	Author.create(author, function(err, doc){

		if(err){
			sendJSONresponse(res, 400, errMessage);
		}

		sendJSONresponse(res, 201, doc);


	});
};


module.exports.deleteAuthor = function(req, res){
	if(!req.params && !req.params.authorid){
		sendJSONresponse(res, 400, errMessage);
	}
	
	var id = req.params.authorid;

	Author.findByIdAndRemove(id, function(err, doc){
		if(err){
			sendJSONresponse(res, 400, err);
		}

		sendJSONresponse(res, 200, { message : 'resource deleted succuessfully', doc});
	})
}