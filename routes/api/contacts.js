const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/contacts");
const validation = require("./validation");

router
  .get("/", controllers.listContacts)
  .post("/", validation.createContact, controllers.addContact);

router
  .get("/:contactId", controllers.getContactById)
  .delete("/:contactId", controllers.removeContact)
  .patch("/:contactId", validation.updateUpdate, controllers.updateContact);

module.exports = router;
