const express = require('express');
const router = express.Router();

const { getTransactions, addTransaction, deleteTransaction, updateTransaction } = require('../controllers/transaction-controller');

router.get('/transactions', getTransactions);
router.post('/add-transaction', addTransaction);
router.delete('/delete-transaction/:id', deleteTransaction);
router.put('/update-transaction/:id', updateTransaction);

module.exports = router;
