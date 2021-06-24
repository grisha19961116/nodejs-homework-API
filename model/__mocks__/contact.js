const { contacts } = require("./data");

const getList = jest.fn(
  (
    _userId,
    { _sortBy, _sortByDesc, _filter, limit = "5", page = "1", _sub }
  ) => {
    return { contacts, total: contacts.length, limit, page };
  }
);

const getById = jest.fn((id, _userId) => {
  const [contact] = contacts.filter((el) => el._id === id);

  return contact;
});

const add = jest.fn((newContact) => {
  const contact = { ...newContact, _id: "604cec3345d8c632bc1fake3" };
  contacts.push(contact);
  return contact;
});

const update = jest.fn((id, body, _userId) => {
  let [contact] = contacts.filter((el) => el._id === id);
  if (contact) return (contact = { ...contact, ...body });
});

const remove = jest.fn((id, _userId) => {
  const index = contacts.findIndex((el) => String(el._id) === String(id));
  if (index === -1) return null;

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
