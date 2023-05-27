const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const User = require('./../model/userModel');

const authMiddleware = async (req, res, next) => {
  //extract token from auth headers
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) {
    res.sendStatus(403);
    // ***
    return next();
  }
  //the token is the second item of the authHeaders
  const token = authHeaders.split(' ')[1];

  try {
    //verify and decode token payload
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await User.getUserById(_id);
    if (!user) return res.sendStatus(401);
    req.user = user;
    // *** -> otherwise next() is called without passing any error object
    return next();
  } catch (err) {
    //error handling middleware executed when error occurs
    res.sendStatus(401);
    return next(err);
  }
};
module.exports = authMiddleware;
