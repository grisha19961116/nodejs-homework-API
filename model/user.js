const User = require("./schemas/user");

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
const updateName = async (id, name) => {
  return await User.findByIdAndUpdate({ _id: id }, { name }, { new: true });
};
const updateAvatar = async (id, avatarUrl) => {
  return await User.updateOne({ _id: id }, { avatarUrl });
};

module.exports = {
  findByEmail,
  createUser,
  updateToken,
  updateName,
  updateAvatar,
  findById,
};
