var mongoose = require('mongoose');

var authorSchema = new mongoose.Schema({
	_id: Object.id,
	name: {
		type: String,
		required: true
	}
});

mongoose.model('Author', authorSchema);