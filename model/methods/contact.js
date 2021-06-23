const Contact = require("../schemas/contact");

const getList = async (
  userId,
  { sortBy, sortByDesc, filter, limit = "5", page = "1", sub }
) => {
  const results = await Contact.paginate(
    { owner: userId },
    {
      limit,
      page,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
      },
      select: {
        ...(filter ? filter.split("|").join(" ") : ""),
        ...(sub ? filter.split("|").join(" ") : ""),
      },
      populate: {
        path: "owner",
        select: "email password subscription token -_id",
      },
    }
  );
  const { docs: contacts, totalDocs: total } = results;
  return { total: total.toString(), limit, page, contacts };
};

const getById = async (id, userId) => {
  const contact = await Contact.findById({
    _id: id,
    owner: userId,
  });
  return contact;
};
const add = async (contact) => {
  const newContact = await Contact.create(contact);
  return newContact;
};

const remove = async (id, userId) => {
  const contact = await Contact.findByIdAndRemove({
    _id: id,
    owner: userId,
  });
  return contact;
};
const update = async (id, body, userId) => {
  const contact = await Contact.findByIdAndUpdate(
    { _id: id, owner: userId },
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
