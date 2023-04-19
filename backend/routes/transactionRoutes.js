const router = require('express').Router();
const controller = require('../controller/transactionController');

router.post('/add-transaction', controller.registerTransaction);

router.get('/get-all-transactions', controller.fetchTransaction);

module.exports = router;
