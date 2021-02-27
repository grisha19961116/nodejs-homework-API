const Contact = require("../model/contacts");

const listContacts = async (_req, res, next) => {
  try {
    const allContacts = await Contact.getList();
    return res.json({
      status: "success",
      code: 200,
      data: {
        allContacts,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactFoundById = await Contact.getById(contactId);
    if (contactFoundById) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contactFoundById,
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
    const { name, email, phone, subscription, password, token } = req.body;
    if (req.body) {
      const newContact = { name, email, phone, subscription, password, token };
      await Contact.add(newContact);
      return res.status(201).json({
        status: "success",
        code: 201,
        data: {
          newContact,
        },
      });
    }
  } catch (e) {
    next(e);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await Contact.remove(contactId);
    if (deletedContact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          deletedContact,
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
    const { contactId } = req.params;
    const update = await Contact.update(contactId, req.body);
    if (update) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          update,
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
