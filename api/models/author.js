var mongoose = require('mongoose');

var authorSchema = new mongoose.Schema({
	firstname: {
		type: String
	},
	middlename: {
		type: String
	},
	lastname: {
		type: String
	}
});

mongoose.model('Author', authorSchema);