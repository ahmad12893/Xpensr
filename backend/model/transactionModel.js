const mongoose = require('./db');

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  reference: { type: String, required: true },
  description: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

const getAll = (userId) => {
  return Transaction.find({ user: userId });
};

const createOne = (transaction, userId) => {
  const newTransaction = new Transaction({ ...transaction, user: userId });
  return newTransaction.save();
};

module.exports = { getAll, createOne };
