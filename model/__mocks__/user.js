const { users } = require("./data");

const findByEmail = jest.fn((email) => {
  const [user] = users.filter((el) => String(el.email) === String(email));
  return user;
});

const findById = jest.fn((id) => {
  const [user] = users.filter((el) => String(el._id) === String(id));
  return user;
});

const createUser = jest.fn(({ name, email, password }) => {
  return {};
});

const updateName = jest.fn((id, body) => {
  return {};
});

const updateToken = jest.fn((id, token) => {
  return {};
});

const updateAvatar = jest.fn((id, avatarUrl) => {
  return {};
});

module.exports = {
  findByEmail,
  createUser,
  updateToken,
  updateName,
  updateAvatar,
  findById,
};
