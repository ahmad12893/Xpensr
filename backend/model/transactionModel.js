const mongoose = require('./db');

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  reference: { type: String, required: true },
  description: { type: String, required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

const getAll = () => {
  return Transaction.find();
};

const createOne = (transaction) => {
  const newTransaction = new Transaction(transaction);
  return newTransaction.save();
};

module.exports = { getAll, createOne };
