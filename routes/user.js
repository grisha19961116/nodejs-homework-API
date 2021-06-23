const express = require("express");
const router = express.Router();
const controllers = require("../controllers/user");
const validation = require("../validation/user");
const guard = require("../helpers/guard");

router
  .post("/register", validation.registration, controllers.createNewUser)
  .post("/login", validation.logIn, controllers.logIn)
  .post("/logout", guard, controllers.logOut)
  .patch("/users", guard, controllers.updateSubscription)
  .get("/users/current", guard, controllers.getCurrent);

module.exports = router;
