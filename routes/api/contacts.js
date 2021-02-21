const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../model/index");
const { createContact, updateUpdate } = require("./validationContacts");
const { v4: uuidv4 } = require("uuid");

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await listContacts();
    res.status(200).json({ message: allContacts });
  } catch (e) {
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactFoundById = await getContactById(contactId);
    if (contactFoundById) {
      res.status(200).json({ message: contactFoundById });
    } else {
      res.status(204).json({ message: "Not found" });
    }
  } catch (e) {
    next(e);
  }
});

router.post("/", createContact, async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (name && email && phone) {
      const id = uuidv4();
      const newContact = { id, name, email, phone };
      await addContact(newContact);
      res.status(201).json({ message: newContact });
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await removeContact(contactId);
    if (deletedContact) {
      return res.status(200).json({ message: "contact deleted" });
    } else {
      next();
    }
  } catch (e) {
    next(e);
  }
});

router.patch("/:contactId", updateUpdate, async (req, res, next) => {
  const { contactId } = req.params;
  try {
    if (!req.body) {
      return res.status(400).json({ message: "missing fields" });
    }
    const update = await updateContact(contactId, req.body);
    if (update) {
      return res.status(200).json({ message: update });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
