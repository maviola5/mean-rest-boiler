var mongoose = require('mongoose');

var postMetaSchema = new mongoose.Schema({
	status: String,
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
	}
});

var postSchema = new mongoose.Schema({
	versions: [postMetaSchema]
});

mongoose.model('PostMeta', postMetaSchema);
mongoose.model('Post', postSchema);