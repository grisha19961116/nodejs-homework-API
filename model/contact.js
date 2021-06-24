const Contact = require("./schemas/contact");

const getList = async (
  userId,
  { sortBy, sortByDesc, filter, limit = "5", page = "1", sub }
) => {
  const options = { owner: userId };
  if (sub) options.subscription = { $all: [sub] };
  const results = await Contact.paginate(options, {
    limit,
    page,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split("|").join(" ") : "",
    populate: {
      path: "owner",
      select: "email password subscription token -_id",
    },
  });
  const { docs: contacts, totalDocs: total } = results;
  return { total: total.toString(), limit, page, contacts };
};

const getById = async (id, userId) => {
  const foundContact = await Contact.findById({
    _id: id,
    owner: userId,
  });
  return foundContact;
};
const add = async (obj) => {
  const contact = await Contact.create(obj);
  return contact;
};

const remove = async (id, userId) => {
  const removedContact = await Contact.findByIdAndRemove({
    _id: id,
    owner: userId,
  });
  return removedContact;
};
const update = async (id, userId, body) => {
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
