const model = require('../model/transactionModel');
/* Industry best practice:
1. use res.json instead of res.send

2. instead of console.log(error), use next(error), create a error handling middleware which you can export and use in the index.js file

NOTE:
next(error) basically passes the error to the middleware responsible for handling that error
*/

const registerTransaction = async (req, res, next) => {
  try {
    const result = await model.createOne(req.body, req.user._id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const fetchTransaction = async (req, res, next) => {
  try {
    // console.log('Request query:', req.query);
    const days = parseInt(req.query.days, 10);
    //by default, we will get the first 10 days of transactions, so if there is no query for days, then days will be 10 by default
    const startDate = req.query.startDate; //this will be the beginning date
    const endDate = req.query.endDate; //this will be the end date
    const type = req.query.type;
    const category = req.query.category;
    // console.log('days:', days, 'startDate:', startDate, 'endDate:', endDate);
    const fetch = await model.getAll(
      req.user._id, //want to get the ID
      days || null, //if days are given, then get the days
      startDate || null, //if start date is specified, get the startdate
      endDate || null, // if the end date is specified, get the end date
      type || null,
      category || null
    );

    res.status(200).json(fetch);
  } catch (error) {
    next(error);
  }
};

const editTransaction = async (req, res, next) => {
  try {
    const { id: transactionId } = req.params;
    // console.log(req.params);
    const updatedTransaction = req.body;
    const result = await model.editOne(transactionId, updatedTransaction);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    const { id: transactionId } = req.params;
    const result = await model.deleteOne({ _id: transactionId });
    res.status(202).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerTransaction,
  fetchTransaction,
  editTransaction,
  deleteTransaction,
};
