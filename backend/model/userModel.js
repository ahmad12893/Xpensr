const mongoose = require('./db');

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
  const newUser = new User(user);
  return newUser.save();
};
