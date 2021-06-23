const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../model/index");
const validation = require("../../validation");
const { v4: uuidv4 } = require("uuid");

router.get("/", async (_req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ message: contacts });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (contact) return res.status(200).json({ message: contact });
    return res.status(204).json({ message: "Not found" });
  } catch (e) {
    next(e);
  }
});

router.post("/", validation.createContact, async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (name && email && phone) {
      const id = uuidv4();
      const contact = { id, name, email, phone };
      await addContact(contact);
      return res.status(201).json({ message: contact });
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await removeContact(id);
    if (contact) return res.status(200).json({ message: "contact deleted" });
    return next();
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", validation.updateUpdate, async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.body) return res.status(400).json({ message: "missing fields" });
    const contact = await updateContact(id, req.body);
    if (contact) return res.status(200).json({ message: contact });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
