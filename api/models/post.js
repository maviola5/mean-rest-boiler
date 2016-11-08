var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var User = mongoose.model('User');
// var Author = mongoose.model('Author');

var postMetaSchema = new mongoose.Schema({
	date: {
		type: Date, 
		'default': Date.now
	},
	modified: {
		type: Date, 
		'default': Date.now
	},
	status: {
		type: String,
		'default': 'draft'
	},
	author: {
		type: String,
		'default': 'Anonymous'
	},
	publisher: {
		type: String,
		required: true,
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
	excerpt: {
		type: String
	}
});

var postSchema = new mongoose.Schema({
	published: postMetaSchema,
	draft: postMetaSchema,
	history: [postMetaSchema]
});


// author: {
	// 	type: authorSchema,
	// 	required: true
	// },
	// publisher: {
	// 	type: userSchema
	// }

mongoose.model('Post', postSchema);

// date
// modified
// status
// title
// content
// excerpt
// author
// publisher


// {
//   published: {},
//   draft: {},
//   history: {
//     "1" : {
//       metadata: <value>,
//       document: {}
//     },
//     ...
//   }
// }