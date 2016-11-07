var mongoose = require('mongoose');
var Post = mongoose.model('Post');

var sendJSONresponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

var errMessage = "Something went wrong"
var deleted = 'resource deleted successfully';

module.exports.createPost = function(req, res){

	if(!req.body && !req.body.title && !req.body.content){
		sendJSONresponse(res, 400, {
			message : "no form values provided"
		});
	} else {

		var post = new Post();

		post.title = req.body.title;
		post.content = req.body.content;
		post.status = req.body.status || 'draft';
		console.log(post);

		Post.create(post, function(err, post){
		if(err){
			sendJSONresponse(res, 400, { message : 'here'});
			console.log(err);
		} else {
			sendJSONresponse(res, 201, post);
		}
	});
	}

};

module.exports.getPosts = function(req, res){

	var options = {};
	if(req.query.status){
		options.status = req.query.status;
	}
	if(req.query.author){
		options.author = req.query.author;
	}

	Post.find(options, function(err, docs){
		if(err){
			sendJSONresponse(res, 400, errMessage);
		}

		sendJSONresponse(res, 200, docs);
	});
};

module.exports.getPost = function(req, res){
	if(!req.params && !req.params.postid){
		sendJSONresponse(res, 400, errMessage);
	}
	var id = req.params.postid;

	Post.findById(id, function(err, doc){
		if(err){
			sendJSONresponse(res, 400, { message : 'id not found'});
		}

		sendJSONresponse(res, 200, doc);
	});
};

module.exports.updatePost = function(req, res){
	if(!req.params && !req.params.postid){
		sendJSONresponse(res, 400, errMessage);
	}
	var id = req.params.postid;

	var update = {};

	if(req.body.title){
		update.title = req.body.title
	}

	if(req.body.content){
		update.content = req.body.content;
	}

	Post.findByIdAndUpdate(id, { $set: update }, { new: true }, function(err, doc){
		if(err){
			sendJSONresponse(res, 400, err);
		}

		sendJSONresponse(res, 200, doc);

	});

};

module.exports.deletePost = function(req, res){
	if(!req.params && !req.params.postid){
		sendJSONresponse(res, 400, errMessage);
	}
	var id = req.params.postid;

	Post.findByIdAndRemove(id, function(err, doc){
		if(err){
			sendJSONresponse(res, 400, err);
		}

		sendJSONresponse(res, 200, { message : deleted , doc});
	})
};