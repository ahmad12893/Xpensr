const mongoose = require('./db');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const createUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = new User({ ...user, password: hashedPassword });
  return newUser.save();
};

const emailExists = async (email) => {
  return await User.exists({ email });
};

const getUserById = async (_id) => {
  return User.findOne({ _id });
};

module.exports = { getUserByEmail, createUser, emailExists, getUserById };
