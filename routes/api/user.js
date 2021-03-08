const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/user");
const validation = require("./validation/validationUser");
const guard = require("../../helpers/guard");

router
  .post("/register", validation.registration, controllers.createNewUser)
  .post("/login", validation.logIn, controllers.logIn)
  .post("/logout", guard, controllers.logout)
  .get("/users/current", guard, controllers.getCurrent);

module.exports = router;
