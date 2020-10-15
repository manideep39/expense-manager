const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;

const transactionSchema = new Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	timestamp: {
		type: Date,
		default: moment().format()
	}
});

module.exports = mongoose.model('Transaction', transactionSchema);
