var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = mongoose.model('User');
var Author = mongoose.model('Author');

var postSchema = new mongoose.Schema({
	_id: Schema.ObjectId,
	date: {
		type: String,
		required: true
	},
	modified: {
		type: String,
		required: true
	},
	status: {
		type: [String],
		required: true,
		'default': 'Draft'
	}
	author: {
		type: authorSchema,
		required: true
	},
	publisher: {
		type: userSchema
	}
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		require: true
	},
	excerpt: {
		type: String,
		required: true
	},
	attachments: {
		type: String,
	}

});

mongoose.model('Post', postSchema);