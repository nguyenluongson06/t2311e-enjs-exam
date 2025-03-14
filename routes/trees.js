const express = require('express');
const router = express.Router();
const Tree = require('../models/tree');

// View a specific tree
router.get('/:id', async (req, res) => {
	try {
		const tree = await Tree.findById(req.params.id);
		if (!tree) {
			return res.status(404).send('Tree not found');
		}
		res.render('tree-detail', {
			title: tree.treename,
			tree,
		});
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
