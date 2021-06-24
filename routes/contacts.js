const express = require("express");
const router = express.Router();
const guard = require("../helpers/guard");
const controllers = require("../controllers/contacts");
const validation = require("../validation/contact");
router
  .get("/", guard, controllers.listContacts)
  .post("/", guard, validation.createContact, controllers.addContact);

router
  .get("/:id", guard, controllers.getContactById)
  .delete("/:id", guard, controllers.removeContact)
  .patch("/:id", guard, validation.update, controllers.updateContact);

module.exports = router;
