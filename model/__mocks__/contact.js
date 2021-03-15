const { contacts } = require("./data");

const getList = jest.fn(
  (userId, { sortBy, sortByDesc, filter, limit = "5", page = "1", sub }) => {
    return { contacts, total: contacts.length, limit, page };
  }
);

const getById = jest.fn((id, userId) => {
  const [contact] = contacts.filter((el) => el._id === id);

  return contact;
});
const add = jest.fn((newContact) => {
  const contact = { ...newContact, _id: "604cec3345d8c632bc1fake3" };
  contacts.push(contact);
  return contact;
});
const update = jest.fn((id, body, userId) => {
  let [contact] = contacts.filter((el) => el._id === id);
  if (contact) {
    contact = { ...contact, ...body };
  }

  return contact;
});
const remove = jest.fn((id, userId) => {
  const index = contacts.findIndex((el) => String(el._id) === String(id));
  if (index === -1) {
    return null;
  }
  const [contact] = contacts.splice(index, 1);
  return contact;
});

module.exports = {
  getList,
  getById,
  add,
  remove,
  update,
};
