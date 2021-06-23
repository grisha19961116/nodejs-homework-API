const Contact = require("../model/methods/contact");

const listContacts = async (req, res, next) => {
  try {
    const id = req.user.id;
    const contacts = await Contact.getList(id, req.query);
    return res.json({
      status: "success",
      code: 200,
      data: {
        ...contacts,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;

    const contact = await Contact.getById(id, userId);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = req.body;
    const userId = req.user.id;
    if (contact) {
      await Contact.add({ ...contact, owner: userId });
      return res.status(201).json({
        status: "success",
        code: 201,
        data: {
          contact,
        },
      });
    }
  } catch (e) {
    next(e);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const contact = await Contact.remove(id, userId);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const contact = await Contact.update(id, req.body, userId);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
