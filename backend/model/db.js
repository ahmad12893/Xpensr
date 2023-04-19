const mongoose = require('mongoose');

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Xpensr');
  console.log('connected to mongoDB');
}

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  reference: { type: String, required: true },
  description: { type: String, required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = { Transaction };
