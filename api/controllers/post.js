var mongoose = require('mongoose');
var PostVersion = mongoose.model('PostVersion');
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

	var postVersion = new PostVersion();
	var post = new Post();

	postVersion.title = req.body.title;
	postVersion.content = req.body.content;
	postVersion.status = req.body.status ? req.body.status.toLowerCase() : 'draft';
	postVersion.category = req.body.category ? req.body.category.toLowerCase() : 'general';
	postVersion.version = 0;

	if(req.body.author){
		postVersion.author = req.body.author;
	}
	if(req.body.publisher){
		postVersion.publisher = req.body.publisher;
	}

	post.published = req.body.published ? req.body.published : Date.now();
	post.modified = req.body.modified ? req.body.modified : Date.now();
	post.versions.push(postVersion);


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
	var postVersion = new postVersion();

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
	var version = new PostVersion();

	version.title = req.body.title;
	version.content = req.body.content;
	version.status = req.body.status ? req.body.status.toLowerCase() : 'draft';

	Post.findById(id, function(err, doc){

		if(doc.versions.length === 0){
			version.version = 0;
		} else {
			var inc = doc.versions[doc.versions.length - 1].version + 1;
			 version.version = inc;
		}
		//todo: modify existing published to draft if new version status === 'published'
		if(version.status === 'published'){
			doc.versions.forEach((item, index, array) => {
				if(item.status === 'published'){
					return item.status = 'draft';
				}
			});
		}

		if(doc.versions.length > 10){
			doc.versions.shift();
		}

		doc.versions.push(version);
		doc.modified = Date.now();

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