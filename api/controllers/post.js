var mongoose = require('mongoose');
var PostMeta = mongoose.model('PostMeta');
var Post = mongoose.model('Post');

var sendJSONresponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

var errMessage = "Something went wrong"

module.exports.createPost = function(req, res){

	if(!req.body && !req.body.title && !req.body.content){
		sendJSONresponse(res, 400, errMessage);
	}

	var postMeta = new PostMeta();
	var post = new Post();

	postMeta.title = req.body.title;
	postMeta.content = req.body.content;
	postMeta.status = req.body.status ? req.body.status.toLowerCase() : 'draft';

	if(req.body.author){
		postMeta.author = req.body.author;
	}
	if(req.body.publisher){
		postMeta.publisher = req.body.publisher;
	}

	post.versions.push(postMeta);

	Post.create(post, function(err, doc){
		if(err){
			sendJSONresponse(res, 200, err);
		}

		sendJSONresponse(res, 200, doc);
	});	

};

module.exports.getPosts = function(req, res){

	Post.find({}, function(err, docs){
		if(err){
			sendJSONresponse(res, 400, errMessage);
		}

		if(req.query.published === 'true'){
			var published = [];

			docs.forEach((item, index, array) => {
				var tempid = item._id;
				item.versions.forEach((item, index, array) => {
					if(item.status === 'published'){
						var tempObj = {
							_id : tempid,
							version : item
						};
						published.push(tempObj);
					}
				})
			});

			sendJSONresponse(res, 200, published);
		} else {
			sendJSONresponse(res, 200, docs);
		}
	});
};

module.exports.getPost = function(req, res){
	if(!req.params && !req.params.postid){
		sendJSONresponse(res, 400, errMessage);
	}
	var id = req.params.postid;

	Post.findById( id, function(err, doc){

		console.log(id);
		if(err){
			sendJSONresponse(res, 400, { message : 'id not found'});
		}

		sendJSONresponse(res, 200, doc);
	});
};

module.exports.getPostVersion = function(req, res){
	if(!req.params && !req.params.versionid){
		sendJSONresponse(res, 400, {message: 'id required'})
	}

	var post = new Post();
	var postMeta = new PostMeta();

	var postid = req.params.postid;
	var versionid = req.params.versionid;
	
	Post.findById(postid, function(err, doc){
		if(err){
			sendJSONresponse(res, 400, errMessage);
		}

		var version = doc.versions.id(versionid);

		sendJSONresponse(res, 200, version);
	})	

};

module.exports.createPostVersion = function(req, res){
	if(!req.params && !req.params.postid){
		sendJSONresponse(res, 400, errMessage);
	}

	if(!req.body && !req.body.title && !req.body.content){
		sendJSONresponse(res, 400, errMessage);
	}

	var id = req.params.postid;
	var version = new PostMeta();

	version.title = req.body.title;
	version.content = req.body.content;
	version.status = req.body.status ? req.body.status.toLowerCase() : 'draft';

	Post.findById(id, function(err, doc){

		//todo: modify existing published to draft if new version status === 'published'

		doc.versions.push(version);

		doc.save(function(err, updatedDoc){
			sendJSONresponse(res, 200, updatedDoc);
		})
	});	

};

module.exports.updatePost = function(req, res){
	if(!req.params && !req.params.postid){
		sendJSONresponse(res, 400, errMessage);
	}
	var id = req.params.postid;
	var update = {};

	Post.findByIdAndUpdate(id, { $set: update }, { new: true }, function(err, doc){
		if(err){
			sendJSONresponse(res, 400, err);
		}
			sendJSONresponse(res, 200, updated);
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