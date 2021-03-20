const User = require("./schemas/user");

const findByEmail = async (email) => {
  return await User.findOne({ email });
};
const findById = async (id) => {
  return await User.findById(id);
};
const createUser = async ({ name, email, password, verify, verifyToken }) => {
  const user = new User({ name, email, password, verify, verifyToken });
  return await user.save();
};
const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};
const updateSubscrip = async (id, body) => {
  return await User.findByIdAndUpdate({ _id: id }, { ...body }, { new: true });
};
const updateAvatar = async (id, avatarUrl) => {
  return await User.updateOne({ _id: id }, { avatarUrl });
};
const UpdateVerifyToken = async (id, verify, verifyToken) => {
  return await User.findByIdAndUpdate({ _id: id }, { verify, verifyToken });
};
const findByVerifyToken = async (verifyToken) => {
  return await User.findOne({ verifyToken });
};

module.exports = {
  findByVerifyToken,
  UpdateVerifyToken,
  findByEmail,
  createUser,
  updateToken,
  updateSubscrip,
  updateAvatar,
  findById,
};
