const mongoose = require('./db');

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  reference: { type: String, required: true },
  description: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

const getAll = async (userId, days) => {
  //make sure getAll accepts days whihc will be subtracted (determined by user on front end)
  const date = new Date();
  //show the difference between now and the last however many days e.g. today-7 days as the setDate
  date.setDate(date.getDate() - days);

  const transactions = await Transaction.find({
    user: userId,
    date: { $gte: date },
  });
  return transactions;
};

const createOne = (transaction, userId) => {
  const newTransaction = new Transaction({ ...transaction, user: userId });
  return newTransaction.save();
};

module.exports = { getAll, createOne };
