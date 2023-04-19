const express = require('express');
const transactionRouter = express.Router();
const controller = require('../controller/transactionController');

transactionRouter.post('/add-transaction', controller.registerTransaction);

transactionRouter.get('/get-all-transactions', controller.fetchTransaction);

module.exports = transactionRouter;
