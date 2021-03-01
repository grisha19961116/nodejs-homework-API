const Contact = require("./schemas/contact");

const getList = async () => {
  const allContacts = await Contact.find({}).select("-__v");
  return allContacts;
};

const getById = async (contactId) => {
  const foundContact = await Contact.findById(contactId).select("-__v");
  return foundContact;
};
const add = async (newContact) => {
  const createdContact = await Contact.create(newContact);
  console.log(createdContact._id, `createdContact`);
  return createdContact;
};

const remove = async (contactId) => {
  const removedContact = await Contact.findByIdAndRemove(contactId);
  return removedContact;
};
const update = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { ...body },
    {
      new: true,
    }
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
