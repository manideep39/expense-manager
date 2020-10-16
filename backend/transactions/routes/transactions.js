const express = require('express');
const router = express.Router();

const { getTransactions, getLastFiveTransactions, addTransaction, deleteTransaction, updateTransaction, getSummary } = require('../controllers/transaction-controller');
const paginationResults = require('../middleware/pagination');

const Transaction = require('../models/transaction');

router.get('/transactions/:id', paginationResults(Transaction), getTransactions);
router.get('/transactions/last-five/:id', getLastFiveTransactions)
router.get('/summary/:id', getSummary)
router.post('/add-transaction', addTransaction);
router.delete('/delete-transaction/:id', deleteTransaction);
router.put('/update-transaction/:id', updateTransaction);

module.exports = router;
