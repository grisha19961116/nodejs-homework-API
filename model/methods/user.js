const User = require("../schemas/user");

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findById = async (id) => {
  return await User.findById(id);
};

const createUser = async ({ name, email, password }) => {
  const user = new User({ name, email, password });
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateSubscription = async (id, body) => {
  return await User.findByIdAndUpdate({ _id: id }, { ...body }, { new: true });
};

module.exports = {
  findByEmail,
  findById,
  createUser,
  updateToken,
  updateSubscription,
};
