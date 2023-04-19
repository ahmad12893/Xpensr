const router = require('express').Router();
const controller = require('../controller/transactionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/add-transaction', authMiddleware, controller.registerTransaction);

router.get(
  '/get-all-transactions',
  authMiddleware,
  controller.fetchTransaction
);

module.exports = router;
