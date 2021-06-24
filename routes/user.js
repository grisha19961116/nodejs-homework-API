const express = require("express");
const router = express.Router();
const controllers = require("../controllers/user");
const validation = require("../validation/user");
const guard = require("../helpers/guard");
const upload = require("../helpers/upload");

router
  .post("/register", validation.registration, controllers.createNewUser)
  .post("/login", validation.logIn, controllers.logIn)
  .post("/logout", guard, controllers.logOut)
  .patch("/users", guard, controllers.updateName)
  .patch(
    "/avatars",
    [guard, upload.single("avatar"), validation.validateUploadAvatar],
    controllers.saveAvatarForStatic
  )
  .get("/users/current", guard, controllers.getCurrent);
module.exports = router;
