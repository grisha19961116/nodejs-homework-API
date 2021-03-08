const Contact = require("../model/contact");

const listContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const allContacts = await Contact.getList(userId);
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
    const userId = req.user.id;
    const contactFoundById = await Contact.getById(
      req.params.contactId,
      userId
    );
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
    const newContact = req.body;
    const userId = req.user.id;
    if (newContact) {
      await Contact.add({ ...newContact, owner: userId });
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
    const userId = req.user.id;
    const deletedContact = await Contact.remove(req.params.contactId, userId);
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
    const userId = req.user.id;
    const update = await Contact.update(req.params.contactId, req.body, userId);
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
