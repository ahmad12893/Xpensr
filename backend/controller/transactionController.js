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
    const fetch = await model.getAll(req.user._id);
    res.status(200).json(fetch);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerTransaction,
  fetchTransaction,
};
