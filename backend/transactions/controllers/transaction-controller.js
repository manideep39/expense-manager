const Transaction = require('../models/transaction');
const moment = require('moment');

const getTransactions = (req, res) => {
	// Transaction.find({ user_id: req.params.id }).then((data) => res.json(data)).catch((err) =>
	// 	res.status(400).json({
	// 		status: 'Failure',
	// 		message: `Error: ${err}`
	// 	})
	// );
	res.json(res.pagination);
};

const getLastFiveTransactions = (req, res) => {
	Transaction.find({ user_id: req.params.id })
		.sort({ _id: -1 })
		.limit(5)
		.then((data) => res.json(data))
		.catch((err) =>
			res.status(400).json({
				status: 'Failure',
				message: `Error: ${err}`
			})
		);
};

const addTransaction = (req, res) => {
	const { user_id, title, amount, type } = req.body;
	const newTransaction = new Transaction({
		user_id,
		title,
		amount,
		type
	});

	newTransaction.save().then(() => res.json('Transaction Added Successfully')).catch((err) =>
		res.status(400).json({
			status: 'Failure',
			message: `Error: ${err}`
		})
	);
};

const deleteTransaction = (req, res) => {
	Transaction.findByIdAndDelete(req.params.id).then(() => res.json('Transaction Deleted Successfully')).catch((err) =>
		res.status(400).json({
			status: 'Failure',
			message: `Error: ${err}`
		})
	);
};

const updateTransaction = (req, res) => {
	Transaction.findById(req.params.id)
		.then((transaction) => {
			transaction.user_id = req.body.user_id;
			transaction.title = req.body.title;
			transaction.amount = req.body.amount;
			transaction.type = req.body.type;
			transaction.timestamp = moment().format();

			transaction.save().then(() => res.json('Transaction updated Successfully')).catch((err) =>
				res.status(400).json({
					status: 'Failure',
					message: `Error: ${err}`
				})
			);
		})
		.catch((err) =>
			res.status(400).json({
				status: 'Failure',
				message: `Error: ${err}`
			})
		);
};

const getSummary = async (req, res) => {
	try {
		let credit = await Transaction.find({ user_id: req.params.id, type: 'credit' });
		credit = credit.reduce((a, c) => a + c.amount, 0);
		let debit = await Transaction.find({ user_id: req.params.id, type: 'debit' });
		debit = debit.reduce((a, c) => a + c.amount, 0);
		let balance = credit - debit;
		res.status(200).json({ credit, debit, balance });
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	getTransactions,
	getLastFiveTransactions,
	addTransaction,
	deleteTransaction,
	updateTransaction,
	getSummary
};
