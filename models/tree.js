const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema({
	treename: {
		type: String,
		required: [true, 'Tree name is required'],
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
	},
	image: {
		type: String,
		default: 'default-tree.jpg',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('TreeCollection', treeSchema);
