const express = require('express');
const transactionRouter = express.Router();

transactionRouter.post('/add-transaction', () => {
  console.log('post route working');
});

transactionRouter.get('/get-all-transactions', () => {
  console.log('get route working');
});

module.exports = transactionRouter;
