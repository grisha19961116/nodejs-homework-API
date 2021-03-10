const express = require("express");
const router = express.Router();
const guard = require("../../helpers/guard");
const controllers = require("../../controllers/contacts");
const validation = require("./validation/validationContact");
router
  .get("/", guard, controllers.listContacts)
  .post("/", guard, validation.createContact, controllers.addContact);

router
  .get("/:contactId", guard, controllers.getContactById)
  .delete("/:contactId", guard, controllers.removeContact)
  .patch("/:contactId", guard, validation.update, controllers.updateContact);

module.exports = router;
