const express = require('express');
const router = express.Router();
const Tree = require('../models/tree');
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
	try {
		const trees = await Tree.find().sort({ createdAt: -1 });
		res.render('index', {
			title: 'TreeShop',
			trees,
		});
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

router.get('/about', (req, res) => {
	res.render('about', { title: 'About Us' });
});

router.get('/add', (req, res) => {
	res.render('add-tree', {
		title: 'Add New Tree',
		errors: [],
		tree: { treename: '', description: '', image: '' },
	});
});

router.post(
	'/add',
	[
		check('treename', 'Tree name is required').notEmpty(),
		check('description', 'Description is required').notEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.render('add-tree', {
				title: 'Add New Tree',
				errors: errors.array(),
				tree: req.body,
			});
		}

		try {
			const newTree = new Tree({
				treename: req.body.treename,
				description: req.body.description,
				image: req.body.image || 'default-tree.jpg',
			});

			await newTree.save();
			res.redirect('/');
		} catch (err) {
			console.error(err);
			res.status(500).send('Server Error');
		}
	},
);

router.get('/reset', async (req, res) => {
	try {
		await Tree.deleteMany({});
		res.redirect('/');
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
