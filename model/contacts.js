const Contact = require("./schemas/contact");

const getList = async () => {
  const allContacts = await Contact.find({});
  return allContacts;
};

const getById = async (contactId) => {
  const foundContact = await Contact.findById({ _id: contactId });
  return foundContact;
};
const add = async (newContact) => {
  const createdContact = await Contact.create(newContact);
  console.log(createdContact._id, `createdContact`);
  return createdContact;
};

const remove = async (contactId) => {
  const removedContact = await Contact.findByIdAndRemove({ _id: contactId });
  return removedContact;
};
const update = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId },
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
