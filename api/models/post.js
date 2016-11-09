var mongoose = require('mongoose');

var postVersionSchema = new mongoose.Schema({
	status: String,
	version: Number,
	created: {
		type: Date,
		'default': Date.now
	},
	author: {
		type: String,
		'default': 'Anonymous'
	},
	publisher: {
		type: String,
		'default': 'Anonymous'
	},
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		require: true
	},
	category: String
});

var postSchema = new mongoose.Schema({
	published: Date,
	modified: Date,
	versions: [postVersionSchema]
});

mongoose.model('PostVersion', postVersionSchema);
mongoose.model('Post', postSchema);