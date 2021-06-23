const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const validation = require("../validation");

router
  .get("/", controllers.listContacts)
  .post("/", validation.createContact, controllers.addContact);

router
  .get("/:id", controllers.getContactById)
  .delete("/:id", controllers.removeContact)
  .patch("/:id", validation.updateUpdate, controllers.updateContact);

module.exports = router;
