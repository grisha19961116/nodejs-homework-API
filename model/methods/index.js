const Contact = require("../schemas");

const getList = async () => {
  const contacts = await Contact.find({}).select("-__v");
  return contacts;
};

const getById = async (id) => {
  const contact = await Contact.findById(id).select("-__v");
  return contact;
};
const add = async (obj) => {
  const contact = await Contact.create(obj);
  return contact;
};

const remove = async (id) => {
  const contact = await Contact.findByIdAndRemove(id);
  return contact;
};
const update = async (id, body) => {
  const contact = await Contact.findByIdAndUpdate(
    id,
    { ...body },
    { new: true }
  );
  return contact;
};

module.exports = {
  getList,
  getById,
  add,
  remove,
  update,
};
