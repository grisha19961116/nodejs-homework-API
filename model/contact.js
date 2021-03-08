const Contact = require("./schemas/contact");

const getList = async (userId) => {
  const allContacts = await Contact.find({});
  return allContacts;
};

const getById = async (id, userId) => {
  const foundContact = await Contact.findById({
    _id: id,
    owner: userId,
  });
  return foundContact;
};
const add = async (newContact) => {
  const createdContact = await Contact.create(newContact);
  return createdContact;
};

const remove = async (id, userId) => {
  const removedContact = await Contact.findByIdAndRemove({
    _id: id,
    owner: userId,
  });
  return removedContact;
};
const update = async (id, body, userId) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true }
  );
  return updatedContact;
};

module.exports = {
  getList,
  getById,
  add,
  remove,
  update,
};
