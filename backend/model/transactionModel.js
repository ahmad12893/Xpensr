const dayjs = require('dayjs');
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

const getAll = async (userId, days, startDate, endDate, type, category) => {
  //create a conditional date, because it may not be normally present
  let dateCondition;
  // console.log('dateCondition:', dateCondition);
  // console.log('typeCondition:', type && type !== 'all' && { type });

  //if a start data and a end date is present, then set the date conditon
  if (startDate && endDate) {
    dateCondition = {
      date: {
        $gte: dayjs(startDate).toDate(), //gte is mongodb language for greater than or equal to, se this to the start date
        $lte: dayjs(endDate).toDate(), // this is therefore less than or equal to, so set it to end date ---> need values on the same day or more recent than start, or same date or less recent then end date, in between these 2 dates if they are provided
      },
    };
  } else if (days) {
    //otherwise, if we are just using the values we put in i.e. '7' or '30' we want to take them away from the current date, so we have all the date greater than current date - number of days
    const date = new Date();
    date.setDate(date.getDate() - days); //this will take the current date away from the days we specify when we select in our home page
    dateCondition = {
      date: { $gte: date }, //which is why we need to use $gte, and here we get all of the values greater than date = currentdate - days i.e. today is 22/04/2023 - 7 days, all values more recent or on the same day as 15/04/2023 will be shown
    };
  } else {
    dateCondition = {}; //otherwise dont do shit
  }
  // const query = {
  //   user: userId,
  //   ...dateCondition,
  //   ...(type && type !== 'all' && { type }),
  // };

  // console.log('Final query:', query);

  // const transactions = await Transaction.find(query);
  let typeCondition = type && type !== 'All' ? { type } : {};
  let categoryCondition = category && category !== 'All' ? { category } : {};
  const transactions = await Transaction.find({
    user: userId, //still find the user by the user id, so we can isolate transactions by user
    ...dateCondition, //but push this stupid thing into it too
    ...typeCondition,
    ...categoryCondition,
  });

  return transactions; //get all the transactions back
};

const createOne = (transaction, userId) => {
  const newTransaction = new Transaction({ ...transaction, user: userId });
  return newTransaction.save();
};

const editOne = (transactionId, updatedTransaction) => {
  const options = { new: true };
  //editing using _id of transaction, and setting it using $set mongoDB
  return Transaction.findOneAndUpdate(
    { _id: transactionId },
    { $set: updatedTransaction },
    options
  );
};

const deleteOne = (transactionId) => {
  return Transaction.findByIdAndDelete(transactionId);
};

module.exports = { getAll, createOne, editOne, deleteOne };
