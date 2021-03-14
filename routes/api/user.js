const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/user");
const validation = require("./validation/validationUser");
const guard = require("../../helpers/guard");
const upload = require("../../helpers/upload");

router
  .post("/register", validation.registration, controllers.createNewUser)
  .post("/login", validation.logIn, controllers.logIn)
  .post("/logout", guard, controllers.logout)
  .patch("/users", guard, controllers.updateSubscription)
  .patch(
    "/avatars",
    [guard, upload.single("avatar"), validation.validateUploadAvatar],
    controllers.saveAvatarForStatic
  )
  .get("/users/current", guard, controllers.getCurrent);
module.exports = router;
