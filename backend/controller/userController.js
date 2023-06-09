const model = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res, next) => {
  try {
    //get user from database using the email they used to create the account
    const user = await model.getUserByEmail(req.body.email);
    //if the user with that email exists and if the password matches the hash
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        //if yes, then a user object is returned which contains the id, name and email dawgy :D
        expiresIn: '10h',
      });
      res.status(200).json({
        success: true,
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      //if the user does not exist or the password does not match the hash, then login fails
      res.status(400).json({ success: false, error: 'Login failed' });
    }
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const emailExists = await model.emailExists(req.body.email);
    const passwordsMatch = await model.passwordMatch(
      req.body.password,
      req.body.confirmPassword
    );
    if (emailExists) {
      res.status(400).json({
        message: 'Email already in use / registered to the database',
      });
    }
    if (!passwordsMatch) {
      res.status(400).json({
        message: 'Passwords do not match',
      });
    } else {
      const createUser = await model.createUser(req.body);
      res.status(201).json(createUser);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser, registerUser };
