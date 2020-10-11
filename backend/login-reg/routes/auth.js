const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

const User = require('../models/User');

router.post('/register', async (req, res) => {
	const { error } = registerValidation(req.body);

	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	const emailExists = await User.findOne({ email: req.body.email });

	if (emailExists) {
		return res.status(400).send('Email already exists in the database');
	}

	// why .genSalt when .hash is enough
	const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword
	});

	try {
		const savedUser = await user.save();
		res.send(savedUser);
	} catch (err) {
		res.status(400).send(err);
	}
});

router.post('/login', async (req, res) => {
	const { error } = loginValidation(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return res.status(400).send('Email or password is wrong');
	}

	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(400).send('Invalid password');

	const { name, email, _id } = await User.findOne({ email: req.body.email });

	res.status(200).json({ name, email, user_id: _id });
});

module.exports = router;
