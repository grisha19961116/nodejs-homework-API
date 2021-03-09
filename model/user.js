const User = require("./schemas/user");

const findByEmail = async (email) => {
  return await User.findOne({ email });
};
const createUser = async ({ name, email, password }) => {
  const user = new User({ name, email, password });
  return await user.save();
};
const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};
const updateSubscrip = async (id, body) => {
  return await User.findByIdAndUpdate({ _id: id }, { ...body }, { new: true });
};

module.exports = {
  findByEmail,
  createUser,
  updateToken,
  updateSubscrip,
};
